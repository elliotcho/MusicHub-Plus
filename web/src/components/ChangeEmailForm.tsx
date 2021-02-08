import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, Heading, Input } from '@chakra-ui/react';
import { useChangeEmailMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

const ChangeEmailForm: React.FC<{}> = () => {
    const [changeEmail] = useChangeEmailMutation();

    return (
        <>            
            <Formik
                initialValues = {{ newEmail: '' }}
                onSubmit = {async ({ newEmail }, { setErrors, setValues }) => {
                    const response = await changeEmail({
                        variables: { newEmail }
                    });

                    if(response.data.changeEmail.user) {
                        setValues({ newEmail: '' });
                    } else {
                        setErrors(toErrorMap(response.data.changeEmail.errors));
                    }
                }}
            >
                {({ values, isSubmitting, handleChange, errors }) => (
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

                        {errors && errors.newEmail && (
                            <Box color='tomato' mb={4}>
                                {errors.newEmail}
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

export default ChangeEmailForm;