import { Injectable } from '@nestjs/common';
import { Song } from './song.entity';
import { SearchDataSourceInterface } from './datasource/search.datasource.interface';

@Injectable()
export class SearchService {
  /**
   * querys
   * @param songTitle : title to search by
   * @param dataSource : dataSource used to query
   * @returns : json of all songs
   */
  async searchSongByTitle(
    songTitle: string,
    dataSource: SearchDataSourceInterface<Song[]>,
  ): Promise<{}> {
    return await dataSource
      .searchSongByTitle(songTitle)
      .then((result: Song[]) => {
        return Promise.resolve({
          result: 'success',
          passedValue: songTitle,
          body: result,
        });
      })
      .catch((errorMessage) => {
        return Promise.resolve({
          result: 'failure',
          passedValue: songTitle,
          error: errorMessage,
        });
      });
  }

  async searchSongById(
    songId: string,
    dataSource: SearchDataSourceInterface<Song[]>,
  ): Promise<{}> {
    return await dataSource
      .searchSongById(songId)
      .then((result: Song[]) => {
        return Promise.resolve({
          result: 'success',
          passedValue: songId,
          body: result,
        });
      })
      .catch((errorMessage) => {
        return Promise.resolve({
          result: 'failure',
          passedValue: songId,
          error: errorMessage,
        });
      });
  }
}
