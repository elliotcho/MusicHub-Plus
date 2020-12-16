import React from 'react';
import { Formik, Form } from 'formik';
import { withApollo } from '../utils/withApollo';
import { Box, Button, Flex, Heading, Input } from '@chakra-ui/react';
import { useLoginMutation } from '../generated/graphql';
import { useRouter } from 'next/router';

const Login: React.FC<{}> = ({}) => {
    const router = useRouter();
    const [login] = useLoginMutation();

    const imgURL = "url('/concert.jpg')";

    return (
       <Flex bgImage={imgURL} bgPosition='center' bgRepeat='no-repeat' h='100vh' align='center' >
            <Formik
                initialValues={{username: '', password: ''}}
                onSubmit={async (values) => {
                    const response = await login({
                        variables: {
                            input: values
                        }
                    });

                    if(response.data.login.user){
                        router.push('/');
                    }
                }}
            >
                {({ values, isSubmitting, handleChange }) => (
                    <Box mx='auto'>
                        <Heading color='white' mb={3}>
                            Sign In
                        </Heading>  

                        <Form>
                            <Input
                                type = 'text'
                                placeholder ='Username'
                                onChange = {handleChange}
                                value = {values.username}
                                background = 'white'
                                name = 'username'
                            />

                            <Input
                                type = 'password'
                                placeholder = 'Password'
                                onChange = {handleChange}
                                value = {values.password}
                                background = 'white'
                                name ='password'
                            />

                            <Button type='submit' mt={4} isLoading={isSubmitting}>
                                Login
                            </Button>
                        </Form>
                    </Box>
                )}
            </Formik>      
        </Flex>
    );
}

export default withApollo({ssr: false})(Login);