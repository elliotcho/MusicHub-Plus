import React, { useState } from 'react';
import Dropzone from 'react-dropzone-uploader'
import { Box, Button, Input } from '@chakra-ui/react';
import { withApollo } from '../utils/withApollo';
import { useUploadSongMutation } from '../generated/graphql';
import ConcertWrapper from '../components/ConcertWrapper';
import 'react-dropzone-uploader/dist/styles.css'

const UploadSong: React.FC<{}> = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');

    const [isLoading, setIsLoading] = useState(false);
  
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
                
                <Box background='white' my={3}>
                    <Dropzone
                        maxFiles={1}
                        styles={{ dropzone: { minHeight: 200, maxHeight: 250 }}}
                        onChangeStatus={({ file }, status) => {
                            if(status !== 'removed') {
                                setFile(file);
                                return;
                            }

                            setFile(null);
                        }}
                    />
                </Box>
               
                <Button
                    isLoading={isLoading}
                    onClick = {async () => {
                        setIsLoading(true);

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