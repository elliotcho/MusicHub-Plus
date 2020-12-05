import { Query, Resolver } from "type-graphql";

@Resolver()
export class SongResolver{
   @Query(() => Boolean)
   createSong(){
    return true;
   }
}