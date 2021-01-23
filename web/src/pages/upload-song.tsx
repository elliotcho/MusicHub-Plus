import React, { useState } from 'react';
import { Box, Button, Input } from '@chakra-ui/react';
import { withApollo } from '../utils/withApollo';
import { useUploadSongMutation } from '../generated/graphql';
import ConcertWrapper from '../components/ConcertWrapper';

const UploadSong: React.FC<{}> = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
  
    const [upload] = useUploadSongMutation();

    return (
        <ConcertWrapper>
            <Box m='auto' width='400px'>
                <Input 
                    type='text' 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder='Song Title'
                    background='white'
                />

                <Input 
                    type='file' 
                    onChange={(e) => setFile(e.target.files[0])}
                    background='white'
                />

                <Button
                    onClick = {async () => {
                        await upload({
                            variables: { file, title }
                        });

                        window.location.reload();
                    }}
                >
                    Submit
                </Button>
            </Box>
        </ConcertWrapper>
    )
}

export default withApollo({ ssr: false })(UploadSong);