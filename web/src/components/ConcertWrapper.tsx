import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Navbar from './Navbar';

interface ConcertLayoutProps {
    gradient?: string | undefined
}

const ConcertWrapper: React.FC<ConcertLayoutProps> = ({ children, gradient = undefined }) => {
    let bgGradient = "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))";

    if(gradient){
        bgGradient = gradient;
    }

    const style = {
        h: "92vh",
        bgImage: `${bgGradient}, url('/concert.jpg')`,
        bgRepeat: "no-repeat",
        bgPosition: "center",
        align: "center"
    }

    return(
        <Box>
            <Navbar />

            <Flex {...style}>
                {children}
            </Flex>
        </Box>
    )
}

export default ConcertWrapper;