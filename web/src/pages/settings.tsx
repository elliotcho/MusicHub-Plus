import React, { useState } from 'react';
import { Box, Button, Heading, Input } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useChangeEmailMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import ConcertWrapper from '../components/ConcertWrapper';
import AuthWrapper from '../components/AuthWrapper';
import ConfirmModal from '../components/ConfirmModal';

const Settings: React.FC<{}> = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [changeEmail] = useChangeEmailMutation()

    return (
        <AuthWrapper requiresAuth>
            <ConcertWrapper>
                <Box mx='auto'>
                    <Heading color='white'>Update email?</Heading>
                    <Formik
                        initialValues = {{ newEmail: '' }}
                        onSubmit = {async ({ newEmail }) => {
                            const response = await changeEmail({
                                variables: { newEmail }
                            });

                            console.log(response)
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
                        onSubmit = {async () => {

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

                                <Button isLoading={isSubmitting} colorScheme='green'>
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>

                    <Heading color='white'>Update password?</Heading>    
                    <Formik
                        initialValues = {{ password: '' ,  newPassword: '' }}
                        onSubmit = {async () => {

                        }}
                    >
                        {({ values, isSubmitting, handleChange }) => (
                            <Form>
                                <Box>
                                    <Input
                                        type = 'password'
                                        placeholder = 'Current Password'
                                        onChange = {handleChange}
                                        value = {values.password}
                                        background = 'white'
                                        name = 'password'
                                    />
                                </Box>

                                <Box>
                                    <Input
                                        type = 'password'
                                        placeholder = 'New Password'
                                        onChange = {handleChange}
                                        value = {values.newPassword}
                                        background = 'white'
                                        name = 'newPassword'
                                    />
                                </Box>

                                <Button isLoading={isSubmitting} colorScheme='green'>
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>

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