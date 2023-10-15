import { SearchDataSourceInterface } from './search.datasource.interface';
import { Song } from '../song.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MockSearchDataSource implements SearchDataSourceInterface<Song[]> {
  async searchSongByTitle(songTitle: string): Promise<Song[]> {
    if (songTitle === ' ') {
      return Promise.reject('Unknown Song');
    }
    let successSong = new Song(
      songTitle,
      ['Mac Miller'],
      'Faces',
      '1RkPqBGgFNPxdzlGD2Ar0m',
      '58',
    );
    return Promise.resolve([successSong]);
  }

  async searchSongById(songId: string): Promise<Song[]> {
    if (songId === ' ') {
      return Promise.reject('Unknown Song');
    }
    let successSong = new Song(
      'Angel Dust',
      ['Mac Miller'],
      'Faces',
      songId,
      '58',
    );
    return Promise.resolve([successSong]);
  }
}
