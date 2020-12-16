import React from 'react';
import { Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';

interface NavbarProps {}

const Navbar : React.FC<{}> = ({}) => {
    return(
        <Flex p={4} bg='tan'>
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
        </Flex>
    )
}

export default Navbar;