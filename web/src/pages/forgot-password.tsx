import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, Heading, Input } from '@chakra-ui/react';
import { withApollo } from '../utils/withApollo';
import { useForgotPasswordMutation } from '../generated/graphql';

import ConcertWrapper from '../components/ConcertWrapper';

const ForgotPassword : React.FC<{}> = () => {
    const [complete, setComplete] = useState(false);

    const [forgotPassword] = useForgotPasswordMutation();

    return (
        <ConcertWrapper>
            <Formik
                initialValues={{ email: '' }}
                onSubmit ={async ({ email }) => {
                    await forgotPassword({
                        variables: { email }
                    });

                    setComplete(true);
                }}
            >
                {({ values, isSubmitting, handleChange }) => (
                    <Box mx='auto' width={400}>
                        {!complete? 
                            (
                                <Form>
                                    <Box>
                                        <Input
                                            type = 'text'
                                            placeholder ='Email'
                                            onChange = {handleChange}
                                            value = {values.email}
                                            background = 'white'
                                            name = 'email'
                                        />
                                    </Box>

                                    <Button type='submit' mt={4} isLoading={isSubmitting}>
                                        Submit
                                    </Button>
                                </Form>
                            ): (
                                <Heading color='white'>
                                    If account with 
                                    that email exists, 
                                    we sent you an email
                                </Heading> 
                            )
                        }
                    </Box>
                )}
            </Formik>
        </ConcertWrapper>
    )
}

export default withApollo({ ssr: false })(ForgotPassword);