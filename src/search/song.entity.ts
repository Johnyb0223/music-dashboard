// songs/song.entity.ts
export class Song {
  constructor(
    public readonly title: string,
    public readonly artist: string[],
    public readonly album: string,
    public readonly spotifyId: string,
    public readonly popularity: string,
  ) {}
}
