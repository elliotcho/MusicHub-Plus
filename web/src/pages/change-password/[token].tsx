import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, Input } from '@chakra-ui/react';
import { withApollo } from '../../utils/withApollo';
import { MeDocument, MeQuery, useChangePasswordMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';
import ConcertWrapper from '../../components/ConcertWrapper';

const ChangePassword: React.FC<{}> = () => {
    const router = useRouter();

    const [changePassword] = useChangePasswordMutation();

    return(
        <ConcertWrapper>
            <Formik
                initialValues={{ newPassword: '' }}
                onSubmit ={async ({ newPassword }) => {
                   const { token }= router.query;

                   const response = await changePassword({
                       variables: { 
                           token: typeof token === 'string'? token: '',
                           newPassword
                        },
                        update: (cache, { data }) => {
                            cache.writeQuery<MeQuery>({
                                query: MeDocument,
                                data: {
                                    __typename: 'Query',
                                    me: data?.changePassword.user
                                }
                            })
                        }
                   });

                   if(response.data?.changePassword.user){
                       router.push('/');
                   } 
                }}
            >
                {({ values, isSubmitting, handleChange }) => (
                    <Box mx='auto' width={400}>
                        <Form>
                            <Input
                                type='password'
                                placeholder='New password'
                                onChange={handleChange}
                                value={values.newPassword}
                                background='white'
                                name='newPassword'
                            />

                            <Button type='submit' mt={4} isLoading={isSubmitting}>
                                Submit
                            </Button>
                        </Form>
                    </Box>
                )}
            </Formik>
        </ConcertWrapper>
    )
}

export default withApollo({ ssr: false })(ChangePassword);