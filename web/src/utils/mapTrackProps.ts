export const mapTrackProps = (song: any) => {
    const { id: userId, username } = song.user;

    const props = {
        ...song,
        key: song.id,
        songId: song.id,
        username,
        userId
    }

    delete props.user;

    return props;
}