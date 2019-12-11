import { Character } from './character.entity';
import { Connection } from 'typeorm';

export const characterProviders = [
  {
    provide: 'CharacterRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Character),
    inject: ['DbConnectionToken'],
  },
];
