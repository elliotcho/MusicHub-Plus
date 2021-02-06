import React, { useState } from 'react';
import { Box, Button, Heading, Input, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useChangeEmailMutation, useChangeUsernameMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import ConcertWrapper from '../components/ConcertWrapper';
import AuthWrapper from '../components/AuthWrapper';
import ConfirmModal from '../components/ConfirmModal';
import NextLink from 'next/link';

const Settings: React.FC<{}> = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [changeEmail] = useChangeEmailMutation();
    const [changeUsername] = useChangeUsernameMutation();

    return (
        <AuthWrapper requiresAuth>
            <ConcertWrapper>
                <Box mx='auto'>
                    <Heading color='white'>Update email?</Heading>
                    <Formik
                        initialValues = {{ newEmail: '' }}
                        onSubmit = {async ({ newEmail }, { setValues }) => {
                            await changeEmail({
                                variables: { newEmail }
                            });

                            setValues({ newEmail: '' });
                        }}
                    >
                        {({ values, isSubmitting, handleChange }) => (
                            <Form>
                                <Box>
                                    <Input
                                        type = 'text'
                                        placeholder = 'New Email'
                                        onChange = {handleChange}
                                        value = {values.newEmail}
                                        background = 'white'
                                        name = 'newEmail'
                                    />
                                </Box>

                                <Button type='submit' isLoading={isSubmitting} colorScheme='green'>
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>

                    <Heading color='white'>Update username?</Heading>
                    <Formik
                        initialValues = {{ newUsername: '' }}
                        onSubmit = {async ({ newUsername }, { setValues }) => {
                            await changeUsername({
                                variables: { newUsername }
                            });

                            setValues({ newUsername: '' });
                        }}
                    >
                        {({ values, isSubmitting, handleChange }) => (
                            <Form>
                                <Box>
                                    <Input
                                        type = 'text'
                                        placeholder = 'New Username'
                                        onChange = {handleChange}
                                        value = {values.newUsername}
                                        background = 'white'
                                        name = 'newUsername'
                                    />
                                </Box>

                                <Button type='submit' isLoading={isSubmitting} colorScheme='green'>
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
   
                    <Box color='white'>
                        <NextLink href='/forgot-password'>
                            <Link>
                                Update password?
                            </Link>
                        </NextLink>
                    </Box>

                    <Button 
                        colorScheme = 'red' 
                        onClick = {() => setIsOpen(true)}
                        _focus = {{ outline: 'none' }}
                    >
                        Delete Account
                    </Button>
                </Box>

                <ConfirmModal 
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    body = 'Are you sure you want to delete your account?'
                    onClick={async () => {
         
                    }}
                />
            </ConcertWrapper>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(Settings);