import { createWithApollo } from './createWithApollo';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import { isServer } from './isServer';

const client = (ctx: NextPageContext) => (
    new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        credentials: 'include',
        cache: new InMemoryCache,
        headers: {
            cookie: 
                (isServer() ?
                    ctx?.req?.headers?.cookie :
                    undefined
                )
        }
    })
);

export const withApollo = createWithApollo(client);