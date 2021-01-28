import React, { useState } from 'react';
import { Box, Button, IconButton, Stack } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon, DeleteIcon } from '@chakra-ui/icons';
import Navbar from '../components/Navbar';
import { withApollo } from '../utils/withApollo';

import { 
    useDeleteSongMutation, 
    useDislikeSongMutation, 
    useLikeSongMutation, 
    useMeQuery, 
    useSongsQuery 
} from '../generated/graphql';

import { updateAfterLike, updateAfterDisike } from '../utils/updateAfterRating';
import { isServer } from '../utils/isServer';
import ConfirmModal from '../components/ConfirmModal';

const Index: React.FC<{}> = ({}) => {
  const { data, loading } = useSongsQuery();
 
  const meResponse = useMeQuery({
    skip: isServer()
  });

  const [deleteSong] = useDeleteSongMutation();
  const [dislikeSong] = useDislikeSongMutation();
  const [likeSong] = useLikeSongMutation();

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

  return (
    <>
      <Navbar />

      <Stack spacing={8} width={400} m='auto'>

        {!loading && data!.songs.songs.map( ({
           id, title, url, ratingStatus, likes, dislikes, user: { id: userId, username }
        }) => 
            <Box key={id} p={8}>
              <Box>
                {title} posted by {username}
              </Box>
              
              <audio controls>
                <source src={url}/>
              </audio>

              <Box mt={4}>
                 {meResponse.data?.me?.id === userId && (
                     <IconButton
                        icon = {<DeleteIcon/>}
                        aria-label = 'Delete Song'
                        _focus = {{outline: 'none'}}
                        onClick = {() => {
                           setToDelete(id);
                           setIsOpen(true);
                        }}
                     />
                 )}

                 <IconButton
                    mx = {4}
                    icon = {<ChevronUpIcon/>}
                    aria-label = 'Like Song'
                    _focus = {{outline: 'none'}}
                    colorScheme = {ratingStatus === 1? 'green' : undefined}
                    onClick = {async () => {
                       await likeSong({
                         variables: { songId: id },
                         update: (cache) => {
                            updateAfterLike(cache, id);
                         }
                       });
                    }}
                 />

                 {likes}

                 <IconButton
                    mx = {4}
                    icon = {<ChevronDownIcon/>}
                    aria-label = 'Disike Song'
                    _focus = {{outline: 'none'}}
                    colorScheme = {ratingStatus === -1? 'red' : undefined}
                    onClick = {async () => {
                       await dislikeSong({
                         variables: { songId: id },
                         update: (cache) => {
                            updateAfterDisike(cache, id);
                         }
                       });
                    }}
                 />

                 {dislikes}
              </Box>
            </Box>
        )}

        {!loading && data!.songs.hasMore && (
          <Button loading={loading} mb={8}>
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