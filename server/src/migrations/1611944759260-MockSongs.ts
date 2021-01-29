import {MigrationInterface, QueryRunner} from "typeorm";

export class MockSongs1611944759260 implements MigrationInterface {

    public async up(_: QueryRunner): Promise<void> {
        // await queryRunner.query(`
        //     insert into song  ("createdAt", title, name, uid) values ('2020-11-24T17:30:52Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-08-02T20:44:18Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-09-04T13:43:26Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-07-31T18:48:58Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2019-12-28T12:59:35Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-06-14T23:31:39Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-06-13T18:44:54Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-03-21T22:05:30Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-06-22T00:30:52Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2021-01-05T06:05:03Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-10-09T01:24:08Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-07-18T16:40:32Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-04-18T17:41:19Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-09-10T11:53:22Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-11-08T06:56:04Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-07-13T08:58:27Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2021-01-11T17:20:31Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2019-12-28T03:44:56Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-06-30T12:36:12Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-11-10T03:03:11Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-10-19T18:02:08Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-09-28T05:39:50Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2021-01-04T20:09:12Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-12-07T19:39:48Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-07-16T00:04:31Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-12-18T17:12:08Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-02-06T03:11:27Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-12-11T09:18:43Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-05-18T11:13:09Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2020-08-08T17:36:33Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        //     insert into song  ("createdAt", title, name, uid) values ('2019-12-28T04:21:47Z', 'Example', 'SONG-c557410d-42d8-45aa-9375-e4622ecf1d62.mp3', 5);
        // `);
    }

    public async down(_: QueryRunner): Promise<void> {}

}
