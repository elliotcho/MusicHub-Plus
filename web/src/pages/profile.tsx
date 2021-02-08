import React, { useState } from 'react';
import { withApollo } from '../utils/withApollo';
import ConcertWrapper from '../components/ConcertWrapper';
import { useDeleteSongMutation, useUserSongsQuery } from '../generated/graphql';
import { mapTrackProps } from '../utils/mapTrackProps';
import { handlePlayEvent } from '../utils/handlePlayEvent';
import { Box, Button, Heading, Stack } from '@chakra-ui/react';
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

    if(loading) {
        return (
            <ConcertWrapper>
                <Box mx='auto'>
                    <Heading color='white'>Loading...</Heading>
                </Box>
            </ConcertWrapper>
        )
    }

    return (
        <AuthWrapper requiresAuth>
            <ConcertWrapper>

                <Stack spacing={8} width='90%' maxW={500} m='auto'>

                    {!loading ? data!.userSongs.songs.map(s => 
                        <Track {...mapTrackProps(s)} deleteSong={confirmDelete}/>
                    ): null}

                    <Box mb={8}> 
                    {!loading ? data!.userSongs.hasMore && (
                        <Button 
                            loading={loading} 
                            _focus={{ outline: 'none' }}
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
                    ): null}
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