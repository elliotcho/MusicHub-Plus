import { PaginatedSongs } from "../generated/graphql";

export const getPaginatedSongsPolicy = () => (
    {
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
);