import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dtos/create-character.dto';
import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';

let testingModule: TestingModule;
let controller: CharactersController;
let spyService: CharactersService;

describe('Characters Controller', () => {
  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [
        {
          provide: CharactersService,
          useFactory: () => ({
            create: jest.fn(),
            findAll: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = testingModule.get(CharactersController);
    spyService = testingModule.get(CharactersService);
  });

  it('#characters should call to findAll method of characters service', () => {
    controller.characters();

    expect(spyService.findAll).toHaveBeenCalledTimes(1);
  });

  it('#create should call to create method of characters service', () => {
    const characterMocked = { name: 'Character mocked!' } as CreateCharacterDto;

    controller.create(characterMocked);

    expect(spyService.create).toHaveBeenCalledTimes(1);
    expect(spyService.create).toHaveBeenCalledWith(characterMocked);
  });
});
