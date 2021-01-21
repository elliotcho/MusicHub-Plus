import React, { useState } from 'react';
import { Box, Button, Input } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { withApollo } from '../utils/withApollo';
import { useUploadSongMutation } from '../generated/graphql';

const Index = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');

  const [upload] = useUploadSongMutation();

  return (
    <>
      <Navbar />

      <Box m='auto' mt={4} width='400px'>
        <Input 
          type='file'
          onChange={(e) => setFile(e.target.files[0])}
        />

        <Input 
            type='text'
            onChange={(e) => setTitle(e.target.value)}
        />

        <Button
          onClick = {async () => {
              file.path = 'path!!';

              try {
                const response = await upload({
                  variables: { file, title }
                });

                console.log(response); 
              } catch (err){
                 console.log(err);
              }
          }}
        >
          Submit
        </Button>
      </Box>
    </> 
  )
};

export default withApollo({ ssr: true })(Index);