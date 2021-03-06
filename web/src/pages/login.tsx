import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Heading, Input, Link } from '@chakra-ui/react';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { withApollo } from '../utils/withApollo';
import ConcertWrapper from '../components/ConcertWrapper';
import AuthWrapper from '../components/AuthWrapper';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

const Login: React.FC<{}> = ({}) => {
    const router = useRouter();
    const [login] = useLoginMutation();

    return (
        <AuthWrapper>
            <ConcertWrapper>
                <Formik
                    initialValues={{username: '', password: ''}}
                    onSubmit={async (values, { setErrors }) => {
                        const response = await login({
                            variables: { input: values },
                            update: (cache, { data }) => {
                                cache.writeQuery<MeQuery>({
                                    query: MeDocument,
                                    data: {
                                        __typename: 'Query',
                                        me: data?.login.user
                                    }
                                });
                            }
                        });

                        if(!response.data.login.user){
                            setErrors(toErrorMap(response.data.login.errors));
                        } else {
                            router.push('/');
                        }
                    }}
                >
                    {({ values, isSubmitting, handleChange, errors }) => (
                        <Box mx='auto' width={400}>
                            
                            <Heading color='white' mb={3}>
                                Sign In
                            </Heading>  

                            <Form>
                                <Box>
                                    <Input
                                        type = 'text'
                                        placeholder ='Username'
                                        onChange = {handleChange}
                                        value = {values.username}
                                        background = 'white'
                                        name = 'username'
                                    />
                                </Box>

                                {errors && errors.username && (
                                    <Box color='tomato'>
                                        {errors.username}
                                    </Box>
                                )}

                                <Box>             
                                    <Input
                                        type = 'password'
                                        placeholder = 'Password'
                                        onChange = {handleChange}
                                        value = {values.password}
                                        background = 'white'
                                        name ='password'
                                    />
                                </Box>

                                
                                {errors && errors.password && (
                                    <Box color='tomato'>
                                        {errors.password}
                                    </Box>
                                )}

                                <Button 
                                    type='submit' 
                                    isLoading={isSubmitting}
                                    mt={4}
                                >
                                    Login
                                </Button>

                                <Box color='white'>
                                    <NextLink href='/forgot-password'>
                                        <Link>
                                            Forgot password?
                                        </Link>
                                    </NextLink>
                                </Box>
                            </Form>
                            
                        </Box>
                    )}
                </Formik>      
            </ConcertWrapper>
        </AuthWrapper>
    );
}

export default withApollo({ ssr: false })(Login);