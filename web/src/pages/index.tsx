import React from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { withApollo } from '../utils/withApollo';
import { useSongsQuery } from '../generated/graphql';

const Index: React.FC<{}> = ({}) => {
  const { data, loading } = useSongsQuery();

  return (
    <>
      <Navbar />

      <Box m='auto' mt={4} width='400px'>
        

        {!loading && data.songs.map( ({url, title}) => 
            <div key={url}>
              <p>{title}</p>
              
              <audio controls>
                <source src={url}/>
              </audio>
            </div>
        )}
      </Box>
    </> 
  )
};

export default withApollo({ ssr: true })(Index);