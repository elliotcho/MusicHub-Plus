import React from 'react';
import Navbar from '../components/Navbar';
import { withApollo } from '../utils/withApollo';

const Index = () => (
  <div>
    <Navbar />
  </div> 
);

export default withApollo({ ssr: true })(Index);