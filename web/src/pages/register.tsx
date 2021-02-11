import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Heading, Input } from '@chakra-ui/react';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { withApollo } from '../utils/withApollo';
import ConcertWrapper from '../components/ConcertWrapper';
import AuthWrapper from '../components/AuthWrapper';
import { useRouter } from 'next/router';

const Register: React.FC<{}> = ({}) => {
    const router = useRouter();
    const [register] = useRegisterMutation();

    return (
        <AuthWrapper>
            <ConcertWrapper>
                <Formik
                    initialValues={{email: '', username: '', password: ''}}
                    onSubmit={async (values, { setErrors }) => {
                        const response = await register({
                            variables: { input: values },
                            update: (cache, { data }) => {
                                cache.writeQuery<MeQuery>({
                                    query: MeDocument,
                                    data: {
                                        __typename: 'Query',
                                        me: data?.register.user
                                    }
                                });
                            }
                        });

                        if(!response.data.register.user){
                            setErrors(toErrorMap(response.data.register.errors));
                        } else {
                            router.push('/');
                        }
                    }}
                >
                {({ values, isSubmitting, handleChange, errors }) => (
                    <Box mx='auto' width={400}>

                        <Heading color='white' mb={3}>
                            Register
                        </Heading>  

                        <Form>
                            <Box>
                                <Input
                                    type = 'text'
                                    placeholder = 'Email'
                                    onChange = {handleChange}
                                    value = {values.email}
                                    background = 'white'
                                    name = 'email'
                                />
                            </Box>


                            {errors && errors.email && (
                                <Box color='tomato'>
                                    {errors.email}
                                </Box>
                            )}

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
                                Register
                            </Button>
                        </Form>

                    </Box>
                )}
                </Formik>
            </ConcertWrapper>
        </AuthWrapper>
    );
}

export default withApollo({ ssr: false })(Register);