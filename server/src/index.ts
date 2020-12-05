import 'reflect-metadata';
import connectRedis from 'connect-redis';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { User } from './entities/User';
import { Song } from './entities/Song';
import { UserResolver } from './resolvers/user';
import { SongResolver } from './resolvers/song';

dotenv.config();

import { sendEmail } from './utils/sendEmail';

const main = async () => {
    await sendEmail('', '');

    await createConnection({
        type: 'postgres',
        database: process.env.DB,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        logging: true,
        synchronize: true,
        entities: [User, Song]
    });

    const app = express();

    const RedisStore = connectRedis(session);
    const redis = new Redis();

    app.use(
        session({
            name: 'cid',
            store: new RedisStore({
                client: redis,
                disableTouch: true
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
                httpOnly: true,
                sameSite: 'lax', //csrf
                secure: false    //includes http
            },
            resave: false,
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET as string
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [SongResolver, UserResolver],
            validate: false
        }),
        context: ({req, res}) => ({req, res, redis})
    });

    apolloServer.applyMiddleware({
        app
    });

    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });
}

main().catch(err => {
    console.log(err);
});