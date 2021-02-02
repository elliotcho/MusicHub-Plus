import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';
import { useApolloClient } from '@apollo/client';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

const Navbar : React.FC<{}> = ({}) => {
    const [logout] = useLogoutMutation();
    const apolloClient = useApolloClient();

    const { data, loading } = useMeQuery({
        skip: isServer()
    });

    let body = null;

    if(!loading && !data?.me){
        body = (
            <>
                <NextLink href = '/login'>
                    <Link mr={4}>
                        Login
                    </Link>
                </NextLink>

                <NextLink href = '/register'>
                    <Link>
                        Register
                    </Link>
                </NextLink>
            </>
        )
    }

    else{
        body = (
            <>
                <NextLink href = '/profile'>
                    <Link mr={3}>
                        Profile
                    </Link>
                </NextLink>

                <NextLink href = '/upload-song'>
                    <Link mr={3}>
                        Upload
                    </Link>
                </NextLink>
                
                <Link
                    onClick = {async (e) => {
                        e.preventDefault();

                        await logout();
                        await apolloClient.resetStore();
                    }}
                >
                    Logout
                </Link>
            </>
        )
    }

    return(
        <Flex p={2} bg='tan' align='center' h='8vh'>
            <NextLink href='/'>
               <Link>
                    <Image 
                        src='/logo.jpg' 
                        alt='Logo'
                        width = '44'
                        height='44'
                    />
               </Link>
            </NextLink>

            <Box ml='auto'>
                {body}
            </Box>
        </Flex>
    )
}

export default Navbar;