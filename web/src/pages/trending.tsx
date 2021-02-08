import React, { useState } from 'react';
import { Box, Button, Heading, Stack } from '@chakra-ui/react';
import { useDeleteSongMutation, useTrendingSongsQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import { handlePlayEvent } from '../utils/handlePlayEvent';
import { mapTrackProps } from '../utils/mapTrackProps';
import ConcertWrapper from '../components/ConcertWrapper';
import ConfirmModal from '../components/ConfirmModal';
import Track from '../components/Track';

const Trending : React.FC<{}> = () => {
    const [cursor, setCursor] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [songId, setSongId] = useState(-1);

    const { loading, data, fetchMore, variables } = useTrendingSongsQuery({
        variables: { 
            limit: 5, 
            cursor: 0 
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

    if(!loading && data.trendingSongs.songs.length === 0) {
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

                {!loading && data!.trendingSongs.songs.map(s => 
                    <Track {...mapTrackProps(s)} deleteSong={confirmDelete}/>
                )}

                <Box mb={8}> 
                {data!.trendingSongs.hasMore && (
                    <Button 
                        isLoading={loading} 
                        _focus={{ outline: 'none' }}
                        onClick = {async () => {
                            const limit = variables?.limit;

                            await fetchMore({
                                variables: { cursor: cursor + 5, limit }
                            });

                            setCursor(cursor + 5);
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
}

export default withApollo({ ssr: true })(Trending);