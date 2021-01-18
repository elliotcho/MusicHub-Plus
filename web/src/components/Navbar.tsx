import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';
import { useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavbarProps {}

const Navbar : React.FC<{}> = ({}) => {
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

    return(
        <Flex p={2} bg='tan' align='center'>
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