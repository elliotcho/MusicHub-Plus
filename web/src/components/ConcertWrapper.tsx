import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Navbar from './Navbar';

const ConcertWrapper: React.FC<{}> = ({ children }) => {
    let bgGradient = "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))";

    const style = {
        h: "92vh",
        bgImage: `${bgGradient}, url('/concert.jpg')`,
        bgRepeat: "no-repeat",
        bgPosition: "center",
        overflow: "auto",
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