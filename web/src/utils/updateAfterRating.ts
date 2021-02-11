import gql from 'graphql-tag';
import { ApolloCache } from "@apollo/client";
import { DislikeSongMutation, LikeSongMutation } from "../generated/graphql";

export const updateAfterLike = (
    cache: ApolloCache<LikeSongMutation >,
    songId: number
 ) => {

   const data = cache.readFragment<{
     id: number
     ratingStatus: number | null;
     dislikes: number;
     likes: number;
   }>({
     id: 'Song:' + songId,
     fragment: gql`
        fragment _ on Song {
           id
           ratingStatus
           dislikes
           likes
        }
     `
   });

   if(data) {
     const { ratingStatus, likes, dislikes } = data;
      
     let newLikesValue = likes;
     let newDislikesValue = dislikes;
     let newStatus = 0;
     
     if(ratingStatus === 1) {
        newLikesValue -= 1;
        newStatus = 0;
     } else {
        if(ratingStatus === -1) {
           newDislikesValue -= 1;
        }

        newLikesValue += 1;
        newStatus = 1;
     }

      cache.writeFragment({
         id: 'Song:' + songId,
         fragment: gql`
           fragment _ on Song {
             ratingStatus
             dislikes
             likes
           }
         `,
         data: { 
           likes: newLikesValue,
           dislikes: newDislikesValue, 
           ratingStatus: newStatus 
         }
      });
   
   }
 }

 export const updateAfterDisike = (
   cache: ApolloCache<DislikeSongMutation >,
   songId: number
 ) => {

    const data = cache.readFragment<{
       id: number
       ratingStatus: number | null;
       dislikes: number;
       likes: number;
     }>({
         id: 'Song:' + songId,
         fragment: gql`
           fragment _ on Song {
             id
             ratingStatus
             dislikes
             likes
         }
       `
     });

     if(data) {
       const { ratingStatus, likes, dislikes } = data;
         
       let newLikesValue = likes;
       let newDislikesValue = dislikes;
       let newStatus = 0;
       
       if(ratingStatus === -1) {
           newDislikesValue -= 1;
           newStatus = 0;
       } else {
           if(ratingStatus === 1) {
             newLikesValue -= 1;
           }

           newDislikesValue += 1;
           newStatus = -1;
       }

       cache.writeFragment({
         id: 'Song:' + songId,
         fragment: gql`
           fragment _ on Song {
             ratingStatus
             dislikes
             likes
           }
         `,
         data: { 
           likes: newLikesValue,
           dislikes: newDislikesValue, 
           ratingStatus: newStatus 
         }
       });
       
     }
   }