import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Song } from "./Song";
import { Rating } from './Rating';

@ObjectType()
@Entity()
export class User extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id! : number;

    @Field()
    @Column( { unique: true })
    username!: string;
    
    @Field()
    @Column( { unique: true })
    email!: string;

    @Column()
    password: string;

    @OneToMany(() => Song, song => song.user)
    songs: Song[];

    @OneToMany(() => Rating, (rating) => rating.user)
    ratings: Rating[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}