import React from 'react';
import { Formik, Form } from 'formik';
import { withApollo } from '../utils/withApollo';
import { Box, Button, Heading, Input } from '@chakra-ui/react';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import ConcertWrapper from '../components/ConcertWrapper';

const Login: React.FC<{}> = ({}) => {
    const router = useRouter();
    const [login] = useLoginMutation();

    return (
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

                    if(response.data.login.user){
                        router.push('/');
                    } else {
                        const errors = {};

                        response.data.login.errors.forEach(({ field, message }) => {
                            errors[field] = message;
                        });

                        setErrors(errors);
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

                            <Button type='submit' mt={4} isLoading={isSubmitting}>
                                Login
                            </Button>
                        </Form>
                    </Box>
                )}
            </Formik>      
        </ConcertWrapper>
    );
}

export default withApollo({ssr: false})(Login);