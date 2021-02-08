import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, Heading, Input } from '@chakra-ui/react';
import { useChangeEmailMutation } from '../generated/graphql';

const ChangeEmailForm: React.FC<{}> = () => {
    const [changeEmail] = useChangeEmailMutation();

    return (
        <>            
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
                        <Heading color='white'>Update email?</Heading>

                        <Box my={4}>
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
        </>
    )
}

export default ChangeEmailForm;