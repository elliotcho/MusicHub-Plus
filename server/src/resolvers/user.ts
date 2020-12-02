import argon2 from 'argon2';
import { User } from 'src/entities/User';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { MyContext } from '../types';

@InputType()
class RegisterInput{
    @Field()
    username: string;
    @Field()
    email: string;
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
           
        }

        return { user };
    }
}