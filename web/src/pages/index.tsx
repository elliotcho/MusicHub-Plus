import React from 'react';
import { Box, IconButton, Stack } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon, DeleteIcon } from '@chakra-ui/icons';
import Navbar from '../components/Navbar';
import { withApollo } from '../utils/withApollo';
import { useDeleteSongMutation, useDislikeSongMutation, useLikeSongMutation, useMeQuery, useSongsQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

const Index: React.FC<{}> = ({}) => {
  const { data, loading } = useSongsQuery();
 
  const meResponse = useMeQuery({
    skip: isServer()
  });

  const [deleteSong] = useDeleteSongMutation();
  const [dislikeSong] = useDislikeSongMutation();
  const [likeSong] = useLikeSongMutation();

  return (
    <>
      <Navbar />

      <Stack m='auto' mt={4} width='400px'>

        {!loading && data.songs.map( ({
           id, title, url, ratingStatus, likes, dislikes, user: { id: userId, username }
        }) => 
            <Box key={id} my={8}>
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
                        onClick = {async () => {
                          await deleteSong({
                             variables: { id },
                             update: (cache) => {
                                cache.evict({ id: 'Song:' + id });
                             }
                          });
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
                         variables: { songId: id }
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
                         variables: { songId: id }
                       });
                    }}
                 />

                 {dislikes}
              </Box>
            </Box>
        )}

      </Stack>
    </> 
  )
};

export default withApollo({ ssr: true })(Index);