import React from 'react';
import { useMeQuery } from '../generated/graphql';
import { useRouter } from 'next/router';

interface AuthWrapperProps {
    requiresAuth?: boolean;
}

const AuthWrapper : React.FC<AuthWrapperProps> = ({ children, requiresAuth = false }) => {
    const router = useRouter();
    const { data, loading } = useMeQuery();

    if(!loading) {

        //for routes users cannot access when signed in
        if(data?.me && !requiresAuth){
            router.push('/');
        }

        //for routes users cannot access when signed out
        else if(!data.me && requiresAuth){
            router.push('/login');
        }

        else {
            return (
                <>
                    {children}
                </>
            );
        }
        
    }

    return <></>
}

export default AuthWrapper;