export interface SearchDataSourceInterface<T> {
  searchSongByTitle(songTitle: string): Promise<T>;
  searchSongById(songId: string): Promise<T>;
}
