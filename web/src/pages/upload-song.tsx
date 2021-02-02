import React, { useState } from 'react';
import Dropzone from 'react-dropzone-uploader'
import { Box, Button, Input, useToast } from '@chakra-ui/react';
import { withApollo } from '../utils/withApollo';
import { useUploadSongMutation } from '../generated/graphql';
import ConcertWrapper from '../components/ConcertWrapper';
import 'react-dropzone-uploader/dist/styles.css'

const UploadSong: React.FC<{}> = () => {
    const toast = useToast();

    const [isLoading, setIsLoading] = useState(false);
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
                        
                        if(title.trim().length === 0){
                            toast({
                                title: 'Title cannot be blank',
                                description: 'Please try again',
                                status: "error",
                                position: 'top',
                                duration: 1000
                            });

                            return;
                        }

                        if(!file){
                            toast({
                                title: 'Missing audio file',
                                description: 'Please try again',
                                status: "error",
                                position: 'top',
                                duration: 1000
                            });

                            return;
                        }

                        setIsLoading(true);
                        
                        await upload({ variables: { file, title } });

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