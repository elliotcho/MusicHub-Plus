import React, { useState } from 'react';
import { Box, Button, Heading, Stack } from '@chakra-ui/react';
import { useDeleteSongMutation, useSongsQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import { mapTrackProps } from '../utils/mapTrackProps';
import { handlePlayEvent } from '../utils/handlePlayEvent';
import ConcertWrapper from '../components/ConcertWrapper';
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

  if(loading) {
    return (
        <ConcertWrapper>
            <Box mx='auto'>
                <Heading color='white'>Loading...</Heading>
            </Box>
        </ConcertWrapper>
    )
  }

  if(!loading && data.songs.songs.length === 0) {
    return (
        <ConcertWrapper>
            <Box mx='auto'>
                <Heading color='white'>No songs</Heading>
            </Box>
        </ConcertWrapper>
    )
  }

  return (
    <ConcertWrapper>

      <Stack spacing={8} width='90%' maxW={500} m='auto'>

        {!loading && data!.songs.songs.map(s => 
           <Track {...mapTrackProps(s)} deleteSong={confirmDelete}/>
        )}

        <Box mb={8}> 
          {data!.songs.hasMore && (
            <Button 
              isLoading={loading}
              _focus={{ outline: 'none' }}
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
         body = 'Are you sure you want to delete this song?'
         onClose={() => setIsOpen(false)}
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