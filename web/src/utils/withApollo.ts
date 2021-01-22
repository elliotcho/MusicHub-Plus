import { createWithApollo } from './createWithApollo';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { NextPageContext } from 'next';
import { isServer } from './isServer';


const client = (ctx: NextPageContext) => (
    new ApolloClient({
        cache: new InMemoryCache,
        link: createUploadLink({
            uri: 'http://localhost:4000/graphql',
            credentials: 'include',
            headers: {
                cookie: 
                    (isServer() ?
                        ctx?.req?.headers?.cookie :
                        undefined
                    )
            }
        }) as any
    })
);

export const withApollo = createWithApollo(client);