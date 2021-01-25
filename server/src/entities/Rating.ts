import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from './User';
import { Song } from './Song';

@Entity()
export class Rating extends BaseEntity {
    @Column()
    value: number;

    @PrimaryColumn()
    userId: number;

    @ManyToOne(() => User, (user) => user.ratings)
    user: User;

    @PrimaryColumn()
    songId: number;

    @ManyToOne(() => Song, (song) => song.ratings, {
        onDelete: 'CASCADE'
    })
    song: Song;
}