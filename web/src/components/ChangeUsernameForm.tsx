import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, FormLabel, Heading, Input } from '@chakra-ui/react';
import { useChangeUsernameMutation } from '../generated/graphql';

const ChangeUsernameForm: React.FC<{}> = () => {
    const [changeUsername] = useChangeUsernameMutation();

    return (
        <>
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
                        <Heading color='white'>Update username?</Heading>

                        <Box my={4}>
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
        </>
    )
}

export default ChangeUsernameForm;