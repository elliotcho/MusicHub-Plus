import React from 'react';
import { withApollo } from '../utils/withApollo';
import ConcertWrapper from '../components/ConcertWrapper';

const Profile: React.FC<{}> = () => {
    return (
        <ConcertWrapper>

        </ConcertWrapper>
    )
}

export default withApollo({ ssr: false })(Profile);