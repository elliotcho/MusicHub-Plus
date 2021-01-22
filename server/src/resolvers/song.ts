import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { GraphQLUpload } from 'graphql-upload';
import { getConnection } from 'typeorm';
import { v4 } from 'uuid';
import { createWriteStream } from 'fs';
import path from 'path';

import { MyContext, Upload } from "../types";
import { isAuth } from '../middleware/isAuth';
import { Song } from "../entities/Song";


@ObjectType()
class SongResponse {
   @Field(() => String)
   title!: string;
   @Field(() => String)
   url!: string;
}

@Resolver()
export class SongResolver{
   @Query(() => [SongResponse])
   async songs() : Promise<[SongResponse] | null > {
     
      const songs = await getConnection().query(
         `
            select title, name from song 
            order by song."createdAt" DESC
         `
      );

      if(songs){
         for(let i=0;i<songs.length;i++){
            const song = songs[i];
            
            const url = `http://localhost:4000/songs/${song.name}`;
            song.url = url;
         }
      }

      return songs? songs: null;
   }

   @Query(() => [SongResponse])
   @UseMiddleware(isAuth)
   async userSongs(
      @Ctx() { req } : MyContext
   ) : Promise<[SongResponse] | null > {
      const { uid } = req.session;
     
      const songs = await getConnection().query(
         `
            select title, name from song 
            where song.uid = ${uid}
            order by song."createdAt" DESC
         `
      );

      if(songs){
         for(let i=0;i<songs.length;i++){
            const song = songs[i];
            
            const url = `http://localhost:4000/songs/${song.name}`;
            song.url = url;
         }
      }

      return songs? songs: null;
   }

   @Mutation(() => Boolean)
   @UseMiddleware(isAuth)
   async uploadSong(
      @Arg('file', () => GraphQLUpload) { createReadStream, filename } : Upload,
      @Arg('title') title: string,
      @Ctx() { req } : MyContext
   ): Promise<boolean> {
         
         const name = 'SONG-' + v4() + path.extname(filename);
         const { uid } = req.session;
         
         try {

            await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Song)
            .values({ title, name, uid })
            .execute();

         } catch (err) {
            return false;
         }

         return new Promise(async (resolve, reject) =>
            createReadStream()
               .pipe(createWriteStream(path.join(__dirname, `../../songs/${name}`)))
               .on('finish', () => resolve(true))
               .on('error', () => reject(false))
         )
   }
}