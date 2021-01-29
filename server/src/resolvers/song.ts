import { 
   Arg, 
   Ctx, 
   Field, 
   FieldResolver, 
   Int, 
   Mutation, 
   ObjectType, 
   Query, 
   Resolver, 
   Root, 
   UseMiddleware 
} from "type-graphql";

import { GraphQLUpload } from 'graphql-upload';
import { getConnection } from 'typeorm';
import { v4 } from 'uuid';
import fs, { createWriteStream } from 'fs';
import path from 'path';

import { MyContext, Upload } from "../types";
import { isAuth } from '../middleware/isAuth';
import { Song } from "../entities/Song";
import { User } from "../entities/User";
import { Rating } from "../entities/Rating";

@ObjectType()
class PaginatedSongs {
   @Field(() => [Song])
   songs!: [Song];
   @Field(() => Boolean)
   hasMore!: boolean;
}

@Resolver(Song)
export class SongResolver{
   @FieldResolver(() => User)
   async user(
      @Root() song: Song
   ) : Promise<User | undefined> {
      return User.findOne(song.uid);
   }

   @FieldResolver(() => Int)
   async ratingStatus(
      @Root() song: Song,
      @Ctx() { req } : MyContext
   ) : Promise<number | null > {
      if(!req.session.uid){
         return null;
      }

      const rating = await Rating.findOne({ 
         userId: req.session.uid,
         songId: song.id
      });

      return rating? rating.value: null;
   }

   @Mutation(() => Boolean)
   @UseMiddleware(isAuth)
   async dislikeSong(
      @Arg('songId', () => Int) songId: number,
      @Ctx() { req } : MyContext
   ) {
      const { uid } = req.session;

      const rating = await Rating.findOne({ songId, userId: uid });

      if(rating?.value === -1) {
         await getConnection().transaction(async (tm) => {
            await tm.query(
               `
                delete from rating
                where "songId" = ${songId} and
                "userId" = ${uid}
               `
            );

            await tm.query(
               `
                update song
                set dislikes = dislikes - 1
                where id = ${songId}
               `
            );
         });
      } else if(rating?.value === 1) {
         await getConnection().transaction(async (tm) => {
            await tm.query(
               `
                update rating
                set value = value - 2
               `
            );

            await tm.query(
               `
                update song
                set likes = likes - 1,
                dislikes = dislikes + 1
                where id = ${songId}
               `
            );
         });
      } else {
         await getConnection().transaction(async (tm) => {
            await tm.query(
               `
                insert into rating ("userId", "songId", value)
                values (${uid}, ${songId}, -1)
               `
            );

            await tm.query(
               `
                update song
                set dislikes = dislikes + 1
                where id = ${songId}
               `
            );
         });
      }

      return true;
   }

   @Mutation(() => Boolean)
   @UseMiddleware(isAuth)
   async likeSong(
      @Arg('songId', () => Int) songId: number,
      @Ctx() { req } : MyContext
   ) {
      const { uid } = req.session;

      const rating = await Rating.findOne({ songId, userId: uid });

      if(rating?.value === 1) {
         await getConnection().transaction(async (tm) => {
            await tm.query(
               `
                delete from rating
                where "songId" = ${songId} and
                "userId" = ${uid}
               `
            );

            await tm.query(
               `
                update song
                set likes = likes - 1
                where id = ${songId}
               `
            );
         });
      } else if(rating?.value === -1) {
         await getConnection().transaction(async (tm) => {
            await tm.query(
               `
                update rating
                set value = value + 2
               `
            );

            await tm.query(
               `
                update song
                set likes = likes + 1,
                dislikes = dislikes - 1
                where id = ${songId}
               `
            );
         });
      } else {
         await getConnection().transaction(async (tm) => {
            await tm.query(
               `
                insert into rating ("userId", "songId", value)
                values (${uid}, ${songId}, 1)
               `
            );

            await tm.query(
               `
                update song
                set likes = likes + 1
                where id = ${songId}
               `
            );
         });
      }

      return true;
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

   @Query(() => PaginatedSongs)
   async songs(
      @Arg('limit', () => Int) limit: number,
      @Arg('cursor', () => String, { nullable: true }) cursor: string | null
   ) : Promise<PaginatedSongs> {
      const realLimit = Math.min(limit, 50);
      let date;

      if(cursor) {
         date = new Date(parseInt(cursor));
      }
     
      const songs = await getConnection().query(
         `
            select * from song 
            ${cursor? `where song."createdAt" < $2 `: ''}
            order by song."createdAt" DESC
            limit $1
         `, 
          cursor? [realLimit + 1, date] : [realLimit + 1]
      );

      for(let i=0;i<songs.length;i++){
         const song = songs[i];
            
         const url = `http://localhost:4000/songs/${song.name}`;
         song.url = url;
      }

      return { 
         hasMore: songs.length === realLimit + 1,
         songs: songs.slice(0, realLimit)
      };
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