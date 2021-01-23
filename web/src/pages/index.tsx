import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { withApollo } from '../utils/withApollo';
import { useMeQuery, useSongsQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

const Index: React.FC<{}> = ({}) => {
  const { data, loading } = useSongsQuery();
 
  const meResponse = useMeQuery({
    skip: isServer()
  });

  return (
    <>
      <Navbar />

      <Stack m='auto' mt={4} width='400px'>

        {!loading && data.songs.map( ({
           id, title, url, user: { id: userId, username }
        }) => 
            <Box key={id} my={8}>
              <Box>
                {title} posted by {username}
              </Box>
              
              <audio controls>
                <source src={url}/>
              </audio>

              <Box>
                 {meResponse.data.me?.id === userId && (
                    'User is owner and can delete'
                 )}
              </Box>
            </Box>
        )}

      </Stack>
    </> 
  )
};

export default withApollo({ ssr: true })(Index);