import { Field, Int, ObjectType } from "type-graphql";
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
    @Column()
    title: string;

    @Field()
    @Column()
    name!: string;

    @Field(() => String)
    url?: string;

    @Field()
    @Column()
    uid: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.songs, {
        onDelete: 'CASCADE'
    })
    user: User;

    @Field(() => Int, { nullable: true })
    ratingStatus: number | null;

    @Field()
    @Column({ default: 0 })
    likes!: number;

    @Field()
    @Column({ default: 0 })
    dislikes!: number;

    @OneToMany(() => Rating, (rating) => rating.song)
    ratings: Rating[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}