import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as request from 'supertest';

import { Connection, createConnection } from 'typeorm';

import { AuthGuard } from '../src/shared/guards/auth.guard';
import { CharactersModule } from '../src/CharactersModule/characters.module';
import { CreateCharacterDto } from '../src/CharactersModule/dtos/create-character.dto';
import { INestApplication } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';

let agent: request.SuperTest<request.Test>;
let db: Connection;
let app: INestApplication;

describe('Characters Controller', () => {
  beforeAll(async () => {
    db = await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'toor',
      database: 'characters',
      entities: [`${process.cwd()}/src/**/*entity.{ts,js}`],
      synchronize: true,
    });
  });

  const server = express();
  server.use(bodyParser.json());

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [CharactersModule],
    })
      .overrideProvider('DbConnectionToken')
      .useValue(db)
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = testingModule.createNestApplication();
    agent = request(app.getHttpServer());

    await app.init();
  });

  it('/GET characters should return an array of characters', () => {
    return agent
      .get('/characters')
      .expect(200)
      .expect(({ body: characters }) => {
        expect(characters).toBeInstanceOf(Array);
      });
  });

  it('/GET characters/:id should return a character', () => {
    return agent
      .get('/characters/1')
      .expect(200)
      .expect(({ body: character }) => {
        expect(character).not.toBeInstanceOf(Array);
      });
  });

  it('/GET characters/name/:name should return a character searched by name', () => {
    const charactersExpect = [{ id: 1, name: 'Son Goku' }];
    const characterName = 'Goku';
    return agent
      .get(`/characters/name/${characterName}`)
      .expect(200)
      .expect(({ body: character }: { body: CreateCharacterDto }) => {
        expect(charactersExpect).toEqual(character);
      });
  });
});
