import { Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { GraphQLUpload } from 'graphql-upload';
import { getConnection } from 'typeorm';
import { v4 } from 'uuid';
import fs, { createWriteStream } from 'fs';
import path from 'path';

import { MyContext, Upload } from "../types";
import { isAuth } from '../middleware/isAuth';
import { Song } from "../entities/Song";
import { User } from "../entities/User";

@Resolver(Song)
export class SongResolver{
   @FieldResolver(() => User)
   async user(
      @Root() song: Song
   ) : Promise<User | undefined> {
      return User.findOne(song.uid);
   }

   @Mutation(() => Boolean)
   @UseMiddleware(isAuth)
   async deleteSong(
      @Arg('id', () => Int) id : number,
      @Ctx() { req } : MyContext
   ) : Promise<Boolean> {
      const song = await Song.findOne(id);

      if(song?.name){
         const location = path.join(__dirname, `../../songs/${song.name}`);

         fs.unlink(location, err => {
            if(err){
               console.log(err);
            }
         });
      }

      await Song.delete({ id, uid: req.session.uid });
      return true;
   }

   @Query(() => [Song])
   async songs() : Promise<[Song] | null > {
     
      const songs = await getConnection().query(
         `
            select * from song 
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