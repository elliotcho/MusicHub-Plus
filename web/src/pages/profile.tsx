import React, { useState } from 'react';
import { withApollo } from '../utils/withApollo';
import ConcertWrapper from '../components/ConcertWrapper';
import { useDeleteSongMutation, useUserSongsQuery } from '../generated/graphql';
import { handlePlayEvent } from '../utils/handlePlayEvent';
import { Box, Button, Stack } from '@chakra-ui/react';
import Track from '../components/Track';
import ConfirmModal from '../components/ConfirmModal';
import AuthWrapper from '../components/AuthWrapper';

const Profile: React.FC<{}> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [songId, setSongId] = useState(-1);

    const { loading, data, fetchMore, variables } = useUserSongsQuery({
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
        <AuthWrapper requiresAuth>
            <ConcertWrapper>

                <Stack spacing={8} width='90%' maxW={500} m='auto'>

                    {!loading && data!.userSongs.songs.map(s => {
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
                    {!loading && data!.userSongs.hasMore && (
                        <Button 
                        loading={loading} 
                        onClick = {async () => {
                            const cursor = data.userSongs.songs[data.userSongs.songs.length - 1].createdAt;
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
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(Profile);