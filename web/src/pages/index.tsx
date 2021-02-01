import React, { useState } from 'react';
import { Button, Stack } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { withApollo } from '../utils/withApollo';

import { 
    useDeleteSongMutation, 
    useSongsQuery 
} from '../generated/graphql';

import { isServer } from '../utils/isServer';
import ConfirmModal from '../components/ConfirmModal';
import Track from '../components/Track';

const Index: React.FC<{}> = ({}) => {
  const { loading, data, fetchMore, variables } = useSongsQuery({
      variables: { 
        limit: 5, 
        cursor: null 
      }
  });

  const [deleteSong] = useDeleteSongMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [toDelete, setToDelete] = useState(-1);

  if(!isServer()){
    document.addEventListener('play', e => {
      const audioList = document.getElementsByTagName('audio');
  
      for(let i=0;i<audioList.length;i++){
         if(audioList[i] !== e.target) {
            audioList[i].pause(); 
         }
      }
    }, true);
  }

  const deleteSongCb = (id: number) => {
      setToDelete(id);
      setIsOpen(true);
  }

  return (
    <>
      <Navbar />

      <Stack spacing={8} width={400} m='auto'>

        {!loading && data!.songs.songs.map(s => {
            const { id: userId, username } = s.user;

            return (
              <Track
                songId = {s.id}
                url = {s.url}
                title = {s.title}
                ratingStatus = {s.ratingStatus}
                dislikes = {s.dislikes}
                likes = {s.likes}
                userId = {userId}
                username = {username}
                deleteSongCb = {deleteSongCb}
              />
            )
        })}

        {!loading && data!.songs.hasMore && (
          <Button 
            onClick = {async () => {
               await fetchMore({
                  variables: { 
                    limit: variables?.limit, 
                    cursor: data.songs.songs[data.songs.songs.length - 1].createdAt
                  }
               });
            }}
            loading={loading} 
            mb={8}
          >
             Load More
          </Button>
        )}

      </Stack>

      <ConfirmModal 
         isOpen={isOpen}
         onClick={async () => {
            await deleteSong({
              variables: { id: toDelete },
              update: (cache) => {
                cache.evict({ id: 'Song:' + toDelete });
              }
            });

            setToDelete(-1);
         }}
         onClose={() => setIsOpen(false)}
         body = 'Are you sure you want to delete this song?'
      />
    </> 
  )
};

export default withApollo({ ssr: true })(Index);