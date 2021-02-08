import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { Box, Button, Link, Stack } from '@chakra-ui/react';
import { useDeleteAccountMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import ConcertWrapper from '../components/ConcertWrapper';
import AuthWrapper from '../components/AuthWrapper';
import ChangeEmailForm from '../components/ChangeEmailForm';
import ChangeUsernameForm from '../components/ChangeUsernameForm';
import ConfirmModal from '../components/ConfirmModal';
import NextLink from 'next/link';

const Settings: React.FC<{}> = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [deleteAccount] = useDeleteAccountMutation();

    const apolloClient = useApolloClient();

    return (
        <AuthWrapper requiresAuth>
            <ConcertWrapper>
                <Stack mx='auto' spacing={12}>

                    <ChangeEmailForm />

                    <ChangeUsernameForm />

                    <Button 
                        colorScheme = 'red' 
                        onClick = {() => setIsOpen(true)}
                        _focus = {{ outline: 'none' }}
                    >
                        Delete Account
                    </Button>
   
                    <Box color='white'>
                        <NextLink href='/forgot-password'>
                            <Link>
                                Update password?
                            </Link>
                        </NextLink>
                    </Box>
                </Stack>

                <ConfirmModal 
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    body = 'Are you sure you want to delete your account?'
                    onClick={async () => {
                        await deleteAccount();
                        await apolloClient.resetStore();
                    }}
                />
            </ConcertWrapper>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(Settings);