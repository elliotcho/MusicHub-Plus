import React from 'react';
import { Box, IconButton } from '@chakra-ui/react';
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
    ratingStatus: number;
    dislikes: number;
    likes: number;
    userId: number;
    username: string;

    deleteSongCb: (id: number) => void;
}

const Track: React.FC<TrackProps> = ({ 
    songId, 
    url, 
    title, 
    ratingStatus, 
    likes, 
    dislikes, 
    username, 
    userId,
    
    deleteSongCb
}) => {

    const [dislikeSong] = useDislikeSongMutation();
    const [likeSong] = useLikeSongMutation();

    const meResponse = useMeQuery({
        skip: isServer()
    });

    return (
        <Box p={8}>
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
                        onClick = {() => deleteSongCb(songId)}
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
