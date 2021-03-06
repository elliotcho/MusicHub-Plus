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
import { MyContext, Upload } from "../types";
import { isAuth } from '../middleware/isAuth';
import { Song } from "../entities/Song";
import { User } from "../entities/User";
import { Rating } from "../entities/Rating";
import fs, { createWriteStream } from 'fs';
import path from 'path';

@ObjectType()
class PaginatedSongs {
   @Field(() => [Song])
   songs!: [Song] | [];
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

      //user has disliked already, so this removes the dislike
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

      } 
      
      //if user has liked the song, remove the like / add the dislike
      else if(rating?.value === 1) {

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

      } 
      
      //user is disliking and has not already liked or disliked
      else {

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

      //user has already liked, so remove this like
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

      } 
      
      //if user has disliked the song, remove the dislike / add the like
      else if(rating?.value === -1) {

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

      } 
      
         
      //user is liking and has not already liked or disliked
      else {

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
      @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
      @Arg('limit', () => Int) limit: number
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
            
         const url = `${process.env.SERVER_URL}/songs/${song.name}`;
         song.url = url;
      }

      return { 
         hasMore: songs.length === realLimit + 1,
         songs: songs.slice(0, realLimit)
      };
   }

   @Query(() => PaginatedSongs)
   @UseMiddleware(isAuth)
   async userSongs(
      @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
      @Arg('limit', () => Int) limit: number,
      @Ctx() { req } : MyContext
   ) : Promise<PaginatedSongs> {
      const { uid } = req.session;
      const realLimit = Math.min(limit, 50);
      let date;

      if(cursor) {
         date = new Date(parseInt(cursor));
      }
     
      const songs = await getConnection().query(
         `
            select * from song 
            where song.uid = ${uid}
            ${cursor? `and song."createdAt" < $2 `: ''}
            order by song."createdAt" DESC
            limit $1
         `, 
          cursor? [realLimit + 1, date] : [realLimit + 1]
      );

      for(let i=0;i<songs.length;i++){
         const song = songs[i];
            
         const url = `${process.env.SERVER_URL}/songs/${song.name}`;
         song.url = url;
      }

      return { 
         hasMore: songs.length === realLimit + 1,
         songs: songs.slice(0, realLimit)
      };
   }

   @Query(() => PaginatedSongs)
   async trendingSongs(
      @Arg('cursor', () => Int, { nullable: true }) cursor: number | null,
      @Arg('limit', () => Int) limit: number
   ) : Promise<PaginatedSongs> {
      const realLimit = Math.min(limit, 50);
     
      const songs = await getConnection().query(
         `
            select * from song 
            order by song.likes - song.dislikes DESC
            limit ${realLimit + 1}
            offset ${cursor} rows
         `
      );

      for(let i=0;i<songs.length;i++){
         const song = songs[i];
            
         const url = `${process.env.SERVER_URL}/songs/${song.name}`;
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