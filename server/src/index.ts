import 'reflect-metadata';
import 'dotenv/config';
import connectRedis from 'connect-redis';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { createSchema } from './utils/createSchema';
import { User } from './entities/User';
import { Song } from './entities/Song';
import { Rating } from './entities/Rating';
import cors from 'cors';
import path from 'path';

const main = async () => {
    await createConnection({
        type: 'postgres',
        url: process.env.DB_URL,
        synchronize: true,
        logging: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        entities: [
            User, 
            Song,
            Rating
        ]
    });

    //await conn.runMigrations();

    const schema = await createSchema();

    const apolloServer = new ApolloServer({
        context: ({req, res}) => ({req, res, redis}),
        schema
    });

    const app = express();

    const RedisStore = connectRedis(session);
    const redis = new Redis();

    app.use(
        cors({
            origin: 'http://localhost:3000',
            credentials: true
        })
    );

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
            secret: process.env.SESSION_SECRET as string,
            saveUninitialized: false,
            resave: false
        })
    );

    app.use('/songs', express.static(path.join(__dirname, '../songs')));

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });
}

main().catch(err => {
    console.log(err);
});