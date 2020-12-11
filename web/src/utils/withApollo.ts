import { createWithApollo } from './createWithApollo';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';

const client = (ctx: NextPageContext) => (
    new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        credentials: 'include',
        cache: new InMemoryCache,
        headers: {
            cookie: 
                (typeof window === 'undefined'
                    ? ctx?.req?.headers?.cookie :
                    undefined
                )
        }
    })
);

export const withApollo = createWithApollo(client);