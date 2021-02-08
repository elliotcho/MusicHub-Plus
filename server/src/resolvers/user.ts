import argon2 from 'argon2';
import { Song } from '../entities/Song';
import { User } from '../entities/User';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, UseMiddleware } from 'type-graphql';
import { getConnection } from 'typeorm';
import { MyContext } from '../types';
import { v4 } from 'uuid';
import { sendEmail } from '../utils/sendEmail';
import { isAuth } from '../middleware/isAuth';
import path from 'path';
import fs from 'fs';

@InputType()
class RegisterInput{
    @Field()
    username: string;
    @Field()
    email: string;
    @Field()
    password: string;
}

@InputType()
class LoginInput{
    @Field()
    username: string;
    @Field()
    password: string;
}

@ObjectType()
class FieldError{
    @Field()
    field: string;
    @Field()
    message: string;
}

@ObjectType()
class UserResponse{
    @Field(() => [FieldError], { nullable: true })
    errors? : FieldError[];
    @Field(() => User, { nullable: true })
    user? : User;
}

@Resolver()
export class UserResolver{
    @Query(() => User, { nullable: true })
    async me(
        @Ctx() { req } : MyContext
    ) : Promise<User | undefined>{
        if(!req.session.uid){
            return undefined;
        }

        return User.findOne(req.session.uid);
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth) 
    async deleteAccount(
        @Ctx() Context : MyContext
    ) : Promise<Boolean> {
        const { uid } = Context.req.session;

        const songs = await Song.find({ uid });

        for(let i=0;i<songs.length;i++) {
            if(songs[i]?.name){
                const location = path.join(__dirname, `../../songs/${songs[i].name}`);
       
                fs.unlink(location, err => {
                   if(err){
                      console.log(err);
                   }
                });
             }
        }

        await Song.delete({ uid });
        await User.delete({ id: uid });
     
        await this.logout(Context);

        return true;
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async changeEmail(
        @Arg('newEmail') newEmail: string,
        @Ctx() { req } : MyContext
    ) : Promise<UserResponse> {
        const user = await User.findOne({ where: { email: newEmail } });
        const { uid } = req.session;

        if(user && user?.id !== uid) {
            return {
                errors: [{
                    field: 'email',
                    message: 'Email taken by another user'
                }]
            };
        }
        
        await User.update({ id: uid }, { email: newEmail });
  
        return { user: await User.findOne(uid) };
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async changeUsername(
        @Arg('newUsername') newUsername: string,
        @Ctx() { req } : MyContext
    ) : Promise<UserResponse> {
        const user = await User.findOne({ where: { username: newUsername } });
        const { uid } = req.session;

        if(user && user?.id !== uid) {
            return {
                errors: [{
                    field: 'email',
                    message: 'Username taken by another user'
                }]
            };
        }
        
        await User.update({ id: uid }, { username: newUsername });
  
        return { user: await User.findOne(uid) };
    }

    @Mutation(() => UserResponse)
    async changePassword(
        @Arg('token') token: string,
        @Arg('newPassword') newPassword: string,
        @Ctx() { redis, req } : MyContext
    ) : Promise<UserResponse> {
        const key = `${token}`;
        const uid = await redis.get(key);

        if(!uid){
            return {
                errors: [{
                    field: 'token',
                    message: 'token expired'
                }]
            };
        }

        const user = await User.findOne(uid);

        await User.update({ id: parseInt(uid) }, { password: await argon2.hash(newPassword) });
        await redis.del(key);

        req.session.uid = parseInt(uid);
        
        return { user };
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email') email: string,
        @Ctx() { redis } : MyContext
    ) : Promise<Boolean> {
        const user = await User.findOne({ where : { email } });
    
        if(!user){
            return true;
        }

        const token = `${v4()}`;

        const href = `<a href='http://localhost:3000/change-password/${token}'>Reset Password</a>`;
        const expiresIn = 1000 * 60 * 60 * 24 * 3;

        await redis.set(token, user.id, 'ex', expiresIn);
        await sendEmail(email, href);

        return true;
    }

    @Mutation(() => UserResponse)
    async register( 
        @Arg('input') input: RegisterInput,
        @Ctx() { req } : MyContext
    ) : Promise<UserResponse> {
        const hashedPassword = await argon2.hash(input.password);
        let user;

        try {
            const result =  await getConnection()
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
                username: input.username,
                email: input.email,
                password: hashedPassword
            })
            .returning('*')
            .execute();

            user = result.raw[0];
        } catch (err) {
           const user = await User.findOne({ email: input.email });

           if(user) {
               return {
                   errors : [{
                        field: 'email',
                        message: 'Email already exists'
                   }]
               };
           } else {
                return {
                    errors : [{
                        field: 'username',
                        message: 'username already exists'
                    }]
                };
           }
        }

        req.session.uid = user.id;

        return { user };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('input') input: LoginInput,
        @Ctx() { req } : MyContext
    ) : Promise<UserResponse> {
        let user;

        if(input.username.includes('@')){
            user = await User.findOne({ where : {email: input.username} });
        } else{
            user = await User.findOne({ where : {username: input.username} });
        }

        if(!user){
            return {
                errors: [{
                    field: 'username',
                    message: 'username is not registered'
                }]
            }
        }

        const valid = await argon2.verify(user.password, input.password);
        
        if(!valid){
            return {
                errors: [{
                    field: 'password',
                    message: 'Incorrect password'
                }]
            }
        }

        req.session.uid = user.id;

        return { user };
    }

    @Mutation(() => Boolean)
    logout(
        @Ctx() { req, res } : MyContext
    ) : Promise<Boolean> {
        return new Promise(resolve => {
            req.session.destroy(err => {
                res.clearCookie('cid');

                if(err){
                    console.log(err);
                    resolve(false);
                    return;
                }

                resolve(true);
            });
        });
    }
}