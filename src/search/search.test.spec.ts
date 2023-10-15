import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SearchModule } from './search.module';

describe('Test Search Module', () => {
  const httpMocks = require('node-mocks-http');
  let searchController: SearchController;
  let searchService: SearchService;

  //establish test module, refresh service/controller befor every test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SearchModule],
    }).compile();
    searchService = module.get<SearchService>(SearchService);
    searchController = module.get<SearchController>(SearchController);
  });

  describe('Test Search by Title', () => {
    it('basic search', async () => {
      const expectedSearchResponse = {
        result: 'success',
        passedValue: 'Angel Dust',
        body: [
          {
            title: 'Angel Dust',
            artist: ['Mac Miller'],
            album: 'Faces',
            spotifyId: '1RkPqBGgFNPxdzlGD2Ar0m',
            popularity: '58',
          },
        ],
      };
      const mockedResponse = httpMocks.createResponse();
      await searchController.searchSongByTitle('Angel Dust', mockedResponse);
      const responseData = JSON.parse(mockedResponse._getData());
      expect(responseData).toEqual(expectedSearchResponse);
    });
    it('song not found', async () => {
      const expectedSearchData = {
        result: 'failure',
        passedValue: ' ',
        error: 'Unknown Song',
      };
      const mockedResponse = httpMocks.createResponse();
      await searchController.searchSongByTitle(' ', mockedResponse);
      const responseData = JSON.parse(mockedResponse._getData());
      expect(responseData).toEqual(expectedSearchData);
    });
  });

  describe('Test Search by Id', () => {
    it('basic search', async () => {
      const expectedSearchData = {
        result: 'success',
        passedValue: '1RkPqBGgFNPxdzlGD2Ar0m',
        body: [
          {
            title: 'Angel Dust',
            artist: ['Mac Miller'],
            album: 'Faces',
            spotifyId: '1RkPqBGgFNPxdzlGD2Ar0m',
            popularity: '58',
          },
        ],
      };
      const mockedResponse = httpMocks.createResponse();
      await searchController.searchSongById(
        '1RkPqBGgFNPxdzlGD2Ar0m',
        mockedResponse,
      );
      const responseData = JSON.parse(mockedResponse._getData());
      expect(responseData).toEqual(expectedSearchData);
    });

    it('song not found', async () => {
      const expectedSearchData = {
        result: 'failure',
        passedValue: ' ',
        error: 'Unknown Song',
      };
      const mockedResponse = httpMocks.createResponse();
      await searchController.searchSongById(
        ' ',
        mockedResponse,
      );
      const responseData = JSON.parse(mockedResponse._getData());
      expect(responseData).toEqual(expectedSearchData);
    });
  });
});
