import { Song } from '../song.entity';
import { SearchDataSourceInterface } from './search.datasource.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SpotifySearchDataSource
  implements SearchDataSourceInterface<Song[]>
{
  accessToken = `BQCTeexlS9qxq-7VSUfSbNFrEH5QBjKyHkkdaDe1H8HXaWHcZBEQ8qAM4X8cA9YKFyzjian6iXiBBTRIptUX1BA51x3U8qx4cBRnU40akCG_PpzRGa4`;

  async searchSongByTitle(songTitle: string): Promise<Song[]> {
    //get list of tracks returned by query
    const titleQueryResult = await this.querySongTitle(songTitle);
    const trackShowQueryResult = await this.getSearchResult(titleQueryResult);
    const tracks = trackShowQueryResult.tracks.items;
    if (tracks.length == 0) {
      return Promise.reject('no songs match title');
    }

    //build list of song elements
    const songList = [];
    for (const track of tracks) {
      const title = track.name;
      const albumName = track.album.name;
      const artistList = [];
      for (const artist of track.artists) {
        artistList.push(artist.name);
      }
      const spotifyId = track.id;
      const poularity = track.popularity;
      songList.push(
        new Song(title, artistList, albumName, spotifyId, poularity),
      );
    }
    return Promise.resolve(songList);
  }

  async querySongTitle(songTitle: string): Promise<string> {
    //setup GET request
    const url  = `https://api.spotify.com/v1/search?q=track:${songTitle}&type=track`;
    const requestParameters = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    };

    //make API request and handle repsonse
    const response : Response = await fetch(url, requestParameters);
    if (response.ok) {
      const responseDict = await response.json()
      return Promise.resolve(responseDict.tracks.href)
    } else {
      return Promise.reject(`${response.status} : ${response.statusText}`)
    }
  }

  async searchSongById(songId : string): Promise<Song[]>{
    return Promise.reject('under development')
  }

  async getSearchResult(url: string): Promise<any> {
    //setup API request;
    const requestParameters = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    };

    const response: Response = await fetch(url, requestParameters);
    if (response.ok) {
      return Promise.resolve(response.json());
    } else {
      return Promise.reject(`${response.status} : ${response.statusText}`)
    }
  }
}
