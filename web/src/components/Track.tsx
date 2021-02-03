import React from 'react';
import { Box, Flex, IconButton, useToast } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon, DeleteIcon } from '@chakra-ui/icons';

import { 
    useDislikeSongMutation, 
    useLikeSongMutation,
    useMeQuery
} from '../generated/graphql';

import { updateAfterLike, updateAfterDisike } from '../utils/updateAfterRating';
import { isServer } from '../utils/isServer';

interface TrackProps {
    songId: number;
    url: string;
    title: string;
    createdAt: string;
    ratingStatus: number;
    dislikes: number;
    likes: number;
    deleteSong(id: number): void;
    userId: number;
    username: string;
}

const Track: React.FC<TrackProps> = ({ 
    songId, 
    url, 
    title, 
    createdAt,
    ratingStatus, 
    likes, 
    dislikes, 
    deleteSong,
    username, 
    userId,
}) => {

    const toast = useToast();

    const [dislikeSong] = useDislikeSongMutation();
    const [likeSong] = useLikeSongMutation();

    const meResponse = useMeQuery({
        skip: isServer()
    });

    return (
        <Box p={8} border='solid black' background='white' my={4} borderRadius='11px'>

            <Flex>
                <Box>{title} posted by {username}</Box>

                <Box ml='auto'>
                    {(new Date(parseInt(createdAt))).toLocaleString()}
                </Box>
            </Flex>

            <audio controls style={{width: '100%', margin: '10px auto'}}>
                <source src={url}/>
            </audio>

            <Box mt={4}>
                {meResponse.data?.me?.id === userId && (
                     <IconButton
                        icon = {<DeleteIcon/>}
                        aria-label = 'Delete Song'
                        onClick = {() => deleteSong(songId)}
                        _focus = {{outline: 'none'}}
                     />
                 )}

                <IconButton
                    mx = {4}
                    icon = {<ChevronUpIcon/>}
                    aria-label = 'Like Song'
                    _focus = {{outline: 'none'}}
                    colorScheme = {ratingStatus === 1? 'green' : undefined}
                    onClick = {async () => {
                       if(!meResponse?.data.me){
                            toast({
                                title: 'Not authenticated',
                                description: 'Please login',
                                status: "error",
                                position: 'top',
                                duration: 1000
                            }); 

                           return;
                       } 

                       await likeSong({
                         variables: { songId },
                         update: (cache) => {
                            updateAfterLike(cache, songId);
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
                       if(!meResponse?.data.me){
                          toast({
                             title: 'Not authenticated',
                             description: 'Please login',
                             status: "error",
                             position: 'top',
                             duration: 1000
                          });

                          return;
                       }  

                       await dislikeSong({
                         variables: { songId },
                         update: (cache) => {
                            updateAfterDisike(cache, songId);
                         }
                       });
                    }}
                 />

                 {dislikes}
            </Box>

        </Box>
    )
}

export default Track;