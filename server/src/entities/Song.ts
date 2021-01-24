import { Field, ObjectType } from "type-graphql";
import { 
    BaseEntity, 
    Column, 
    CreateDateColumn, 
    Entity, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";
import { User } from "./User";
import { Rating } from './Rating';

@ObjectType()
@Entity()
export class Song extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({ unique: true })
    title!: string;

    @Field()
    @Column({ unique: true })
    name!: string;

    @Field()
    url?: string;

    @Field()
    @Column()
    uid: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.songs)
    user: User;

    @OneToMany(() => Rating, (rating) => rating.song)
    ratings: Rating[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}