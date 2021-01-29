import { createWithApollo } from './createWithApollo';
import { PaginatedSongs } from '../generated/graphql';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { NextPageContext } from 'next';
import { isServer } from './isServer';

const client = (ctx: NextPageContext) => (
    new ApolloClient({
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
        }) as any,
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        songs: {
                            keyArgs: ['PaginatedSongs'],
                            merge(
                                existing: PaginatedSongs | undefined,
                                incoming: PaginatedSongs
                            ) : PaginatedSongs {
                                return {
                                    ...incoming,
                                    songs: [
                                        ...(existing?.songs || []),
                                        ...incoming.songs
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        })
    })
);

export const withApollo = createWithApollo(client);