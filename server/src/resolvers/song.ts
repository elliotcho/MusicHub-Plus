import { Arg, Mutation, Resolver } from "type-graphql";
import { GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import path from 'path';

import { Upload } from "../types";

@Resolver()
export class SongResolver{
   @Mutation(() => Boolean)
   async uploadFile(
      @Arg('file', () => GraphQLUpload){
         createReadStream,
         filename
      } : Upload): Promise<boolean> {
         console.log(__dirname + `../../images/${filename}`)

         return new Promise(async (resolve, reject) =>
            createReadStream()
               .pipe(createWriteStream(path.join(__dirname, `../../images/${filename}`)))
               .on('finish', () => resolve(true))
               .on('error', () => reject(false))
         )
      }
}