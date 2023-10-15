import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { Song } from './song.entity';
import { SpotifySearchDataSource } from './datasource/spotify.datasource';
import { MockSearchDataSource } from './datasource/mock.datasource';

@Module({
  imports: [Song],
  controllers: [SearchController],
  providers: [
    SearchService,
    {
      provide: 'SpotifyDataSource',
      useClass: SpotifySearchDataSource,
    },
    {
      provide: 'MockDataSource',
      useClass: MockSearchDataSource,
    },
  ],
})
export class SearchModule {}
