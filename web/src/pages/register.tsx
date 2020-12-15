import React from 'react';
import { Formik, Form } from 'formik';
import { withApollo } from '../utils/withApollo';
import { Button, Flex, Input } from '@chakra-ui/react';
import { useRegisterMutation } from '../generated/graphql';
import { useRouter } from 'next/router';

const Login: React.FC<{}> = ({}) => {
    const router = useRouter();
    const [register] = useRegisterMutation();

    return (
        <Flex mt={4} mx='auto' maxWidth={600}>
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
                <Form>
                    <Input
                        type = 'text'
                        placeholder = 'Email'
                        onChange = {handleChange}
                        value = {values.email}
                        name = 'email'
                    />

                    <Input
                        type = 'text'
                        placeholder ='Username'
                        onChange = {handleChange}
                        value = {values.username}
                        name = 'username'
                    />

                    <Input
                        type = 'password'
                        placeholder = 'Password'
                        onChange = {handleChange}
                        value = {values.password}
                        name ='password'
                    />

                    <Button type='submit' mt={4} isLoading={isSubmitting}>
                        Login
                    </Button>
                </Form>
            )}
            </Formik>
        </Flex>
    );
}

export default withApollo({ssr: false})(Login);