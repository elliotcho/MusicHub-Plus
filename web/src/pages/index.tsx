import React, { useState } from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';
import ConcertWrapper from '../components/ConcertWrapper';
import { withApollo } from '../utils/withApollo';
import { useDeleteSongMutation, useSongsQuery } from '../generated/graphql';
import { handlePlayEvent } from '../utils/handlePlayEvent';
import ConfirmModal from '../components/ConfirmModal';
import Track from '../components/Track';

const Index: React.FC<{}> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [songId, setSongId] = useState(-1);

  const { loading, data, fetchMore, variables } = useSongsQuery({
      variables: { 
        limit: 5, 
        cursor: null 
      }
  });

  const [deleteSong] = useDeleteSongMutation();

  const confirmDelete = (id: number) => {
      setIsOpen(true);
      setSongId(id);
  }

  handlePlayEvent();

  return (
    <ConcertWrapper>

      <Stack spacing={8} width={400} m='auto'>

        {!loading && data!.songs.songs.map(s => {
            const { id: userId, username } = s.user;

            return (
              <Track
                key = {s.id}
                songId = {s.id}
                url = {s.url}
                title = {s.title}
                ratingStatus = {s.ratingStatus}
                dislikes = {s.dislikes}
                likes = {s.likes}
                deleteSong = {confirmDelete}
                userId = {userId}
                username = {username}
              />
            )
        })}

        <Box mb={8}> 
          {!loading && data!.songs.hasMore && (
            <Button 
              loading={loading} 
              onClick = {async () => {
                const cursor = data.songs.songs[data.songs.songs.length - 1].createdAt;
                const limit = variables?.limit;

                await fetchMore({
                  variables: { cursor, limit }
                });
            }}
            >
              Load More
            </Button>
          )}
        </Box>

      </Stack>

      <ConfirmModal 
         isOpen={isOpen}
         onClose={() => setIsOpen(false)}
         body = 'Are you sure you want to delete this song?'
         onClick={async () => {
          await deleteSong({
            variables: { id: songId },
            update: (cache) => {
              cache.evict({ id: 'Song:' + songId });
            }
          });
         }}
       />
       
    </ConcertWrapper> 
  )
};

export default withApollo({ ssr: true })(Index);