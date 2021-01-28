import {MigrationInterface, QueryRunner} from "typeorm";

export class MockSongs1611859894059 implements MigrationInterface {

    public async up(_: QueryRunner): Promise<void> {
        // await queryRunner.query(`
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);

        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);

        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);

        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);

        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);

        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);

        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        //     insert into song (title, name, uid) values ('Example', 'SONG-3cf8d3c5-d5f4-49f3-b8fa-aac8199369e8.mp3', 5);
        // `);
    }

    public async down(_: QueryRunner): Promise<void> {}

}
