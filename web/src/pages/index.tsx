import React from 'react';
import Navbar from '../components/Navbar';
import { withApollo } from '../utils/withApollo';

const Index = () => (
  <>
    <Navbar />

    
  </> 
);

export default withApollo({ ssr: true })(Index);