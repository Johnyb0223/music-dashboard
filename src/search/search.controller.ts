import { Controller, Get, Param, Res, Inject } from '@nestjs/common';
import { SearchService } from './search.service';
import { Response } from 'express';
import { Song } from './song.entity';
import { SearchDataSourceInterface } from './datasource/search.datasource.interface';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    @Inject('MockDataSource')
    private readonly searchDataSource: SearchDataSourceInterface<Song[]>,
  ) {}

  @Get('songByTitle/:title')
  async searchSongByTitle(
    @Param('title') songTitle: string,
    @Res() res: Response,
  ): Promise<void> {
    const response = await this.searchService.searchSongByTitle(
      songTitle,
      this.searchDataSource,
    );
    res.json(response);
  }

  @Get('songById/:id')
  async searchSongById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    const response = await this.searchService.searchSongById(id, this.searchDataSource);
    res.json(response)
  }
}
