import React from 'react';
import Navbar from '../components/Navbar';
import { withApollo } from '../utils/withApollo';
import Router from 'next/router';

const Index = () => (
  <>
    <Navbar />

    <p onClick={() => Router.push('/login')}>
      To Login
    </p>

    <p onClick={() => Router.push('/register')}>
        Register
    </p>
  </> 
);

export default withApollo({ ssr: true })(Index);