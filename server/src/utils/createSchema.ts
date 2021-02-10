import { buildSchema } from 'type-graphql';
import { UserResolver } from '../resolvers/user';
import { SongResolver } from '../resolvers/song';

export const createSchema = async () => (
    await buildSchema({
        validate: false,
        resolvers: [
            UserResolver,
            SongResolver
        ]
    })
);