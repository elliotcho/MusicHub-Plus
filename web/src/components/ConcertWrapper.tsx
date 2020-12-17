import React from 'react';
import { Flex } from '@chakra-ui/react';

interface ConcertLayoutProps {
    gradient?: string | undefined
}

const ConcertWrapper: React.FC<ConcertLayoutProps> = ({ children, gradient = undefined }) => {
    let bgGradient = "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))";

    if(gradient){
        bgGradient = gradient;
    }

    const style = {
        bgImage: `${bgGradient}, url('/concert.jpg')`,
        bgRepeat: "no-repeat",
        bgPosition: "center",
        h: "100vh",
        align: "center"
    }

    return(
        <Flex {...style}>
            {children}
        </Flex>
    )
}

export default ConcertWrapper;