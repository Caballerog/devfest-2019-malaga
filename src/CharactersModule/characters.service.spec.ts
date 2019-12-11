import { Character } from './models/character.interface';
import { CharactersService } from './characters.service';
import { HttpException } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';

let testingModule: TestingModule;
let service: CharactersService;
let spyRepository: Repository<Character>;

describe('Characters Service', () => {
  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        CharactersService,
        {
          provide: 'CharacterRepositoryToken',
          useFactory: () => ({
            find: jest.fn(),
            findOne: jest.fn(() => true),
            findAll: jest.fn(),
            insert: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = testingModule.get<CharactersService>(CharactersService);
    spyRepository = testingModule.get<Repository<Character>>(
      'CharacterRepositoryToken',
    );
  });

  it('#findAll should find all characters', () => {
    service.findAll();
    expect(spyRepository.find).toHaveBeenCalledTimes(1);
  });

  describe('#findById', () => {
    it('should return an exception if no character was found', async () => {
      spyRepository.findOne = jest.fn();

      await expect(service.findById(1)).rejects.toBeInstanceOf(HttpException);
    });

    it('should not return an exception if a character was found', () => {
      service.findById(1);

      expect(spyRepository.findOne).toHaveBeenCalledTimes(1);
      expect(spyRepository.findOne).toHaveBeenCalledWith(1);
    });
  });
});
