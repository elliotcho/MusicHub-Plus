import React from 'react';
import { Formik, Form } from 'formik';
import { withApollo } from '../utils/withApollo';
import { Box, Button, Heading, Input } from '@chakra-ui/react';
import { useRegisterMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import ConcertWrapper from '../components/ConcertWrapper';

const Login: React.FC<{}> = ({}) => {
    const router = useRouter();
    const [register] = useRegisterMutation();

    return (
        <ConcertWrapper>
            <Formik
                initialValues={{email: '', username: '', password: ''}}
                onSubmit={async (values) => {
                    const response = await register({
                        variables: {
                            input: values
                        }
                    });

                    if(response.data.register.user){
                        router.push('/');
                    } 
                }}
            >
            {({ values, isSubmitting, handleChange }) => (
                <Box mx='auto'>
                    <Heading color='white' mb={3}>
                        Register
                    </Heading>  

                    <Form>
                        <Input
                            type = 'text'
                            placeholder = 'Email'
                            onChange = {handleChange}
                            value = {values.email}
                            background = 'white'
                            name = 'email'
                        />

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
        </ConcertWrapper>
    );
}

export default withApollo({ssr: false})(Login);