import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, Heading, Input } from '@chakra-ui/react';
import { useChangeUsernameMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

const ChangeUsernameForm: React.FC<{}> = () => {
    const [changeUsername] = useChangeUsernameMutation();

    return (
        <>
            <Formik
                initialValues = {{ newUsername: '' }}
                onSubmit = {async ({ newUsername }, { setErrors, setValues }) => {
                    const response = await changeUsername({
                        variables: { newUsername }
                    });

                    if(response.data.changeUsername.user) {
                        setValues({ newUsername: '' });
                    } else { 
                        setErrors(toErrorMap(response.data.changeUsername.errors));
                    }
                }}
            >
                {({ values, isSubmitting, handleChange, errors }) => (
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

                        {errors && errors.newUsername && (
                            <Box color='tomato' mb={4}>
                                {errors.newUsername}
                            </Box>
                        )}

                        <Button 
                            type='submit' 
                            isLoading={isSubmitting} 
                            colorScheme='green'
                            width='100%'
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default ChangeUsernameForm;