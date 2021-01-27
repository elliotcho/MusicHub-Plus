import React from 'react';
import { Box, IconButton, Stack } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon, DeleteIcon } from '@chakra-ui/icons';
import Navbar from '../components/Navbar';
import { withApollo } from '../utils/withApollo';
import { DislikeSongMutation, LikeSongMutation, useDeleteSongMutation, useDislikeSongMutation, useLikeSongMutation, useMeQuery, useSongsQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import gql from 'graphql-tag';
import { ApolloCache } from '@apollo/client';

const Index: React.FC<{}> = ({}) => {
  const { data, loading } = useSongsQuery();
 
  const meResponse = useMeQuery({
    skip: isServer()
  });

  const [deleteSong] = useDeleteSongMutation();
  const [dislikeSong] = useDislikeSongMutation();
  const [likeSong] = useLikeSongMutation();

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

  const updateAfterLike = (
     cache: ApolloCache<LikeSongMutation >,
     songId: number
  ) => {
    const data = cache.readFragment<{
      id: number
      ratingStatus: number | null;
      dislikes: number;
      likes: number;
    }>({
      id: 'Song:' + songId,
      fragment: gql`
         fragment _ on Song {
            id
            ratingStatus
            dislikes
            likes
         }
      `
    });

    if(data) {
      const { ratingStatus, likes, dislikes } = data;
       
      let newLikesValue = likes;
      let newDislikesValue = dislikes;
      let newStatus = 0;
      
      if(ratingStatus === 1) {
         newLikesValue -= 1;
         newStatus = 0;
      } else {
         if(ratingStatus === -1) {
            newDislikesValue -= 1;
         }

         newLikesValue += 1;
         newStatus = 1;
      }

       cache.writeFragment({
          id: 'Song:' + songId,
          fragment: gql`
            fragment _ on Song {
              ratingStatus
              dislikes
              likes
            }
          `,
          data: { 
            likes: newLikesValue,
            dislikes: newDislikesValue, 
            ratingStatus: newStatus 
          }
       });
    }
  }

  const updateAfterDisike = (
    cache: ApolloCache<DislikeSongMutation >,
    songId: number
  ) => {
     const data = cache.readFragment<{
        id: number
        ratingStatus: number | null;
        dislikes: number;
        likes: number;
      }>({
          id: 'Song:' + songId,
          fragment: gql`
            fragment _ on Song {
              id
              ratingStatus
              dislikes
              likes
          }
        `
      });

      if(data) {
        const { ratingStatus, likes, dislikes } = data;
          
        let newLikesValue = likes;
        let newDislikesValue = dislikes;
        let newStatus = 0;
        
        if(ratingStatus === -1) {
            newDislikesValue -= 1;
            newStatus = 0;
        } else {
            if(ratingStatus === 1) {
              newLikesValue -= 1;
            }

            newDislikesValue += 1;
            newStatus = -1;
        }

        cache.writeFragment({
          id: 'Song:' + songId,
          fragment: gql`
            fragment _ on Song {
              ratingStatus
              dislikes
              likes
            }
          `,
          data: { 
            likes: newLikesValue,
            dislikes: newDislikesValue, 
            ratingStatus: newStatus 
          }
        });
      }
    }

  return (
    <>
      <Navbar />

      <Stack m='auto' mt={4} width='400px'>

        {!loading && data.songs.map( ({
           id, title, url, ratingStatus, likes, dislikes, user: { id: userId, username }
        }) => 
            <Box key={id} my={8} p={8}>
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

      </Stack>
    </> 
  )
};

export default withApollo({ ssr: true })(Index);