import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Character } from './models/character.interface';
import { NotCharacterException } from './exceptions/not-character-exception';
import { RepeatCharacterException } from './exceptions/repeat-character-exception';

@Injectable()
export class CharactersService {
  private FAKE_ID = 10000;
  private characters: Character[] = [];

  findAll(): Character[] {
    return this.characters;
  }
  findById(characterID: number): Character {
    const character = this.characters.find(({ id }) => id === characterID);
    if (!character) {
      throw new HttpException(
        'Characters Service: Character not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return character;
  }
  findByName(name: string): Character[] {
    const heroes = this.characters.filter(character =>
      character.name.includes(name),
    );
    if (heroes.length === 0) {
      throw new NotFoundException('Characters Service: Character not found');
    }
    return heroes;
  }
  updateById(characterID: number, name: string): Character {
    const character = this.characters.find(
      character => character.id === characterID,
    );
    if (character) {
      character.name = name;
    }
    return character;
  }
  deleteById(characterID: number): Character {
    const characterIndex = this.characters.findIndex(
      character => character.id === characterID,
    );
    if (characterIndex === -1) {
      throw new NotCharacterException(characterID);
    }
    const character = this.characters[characterIndex];
    this.characters.splice(characterIndex, 1);
    return character;
  }
  create(name: string): Character {
    const characterFound = this.characters.find(
      character => character.name === name,
    );
    if (characterFound) {
      throw new RepeatCharacterException(characterFound);
    }
    const character: Character = {
      name,
      id: this.FAKE_ID,
    };
    this.characters = [...this.characters, character];
    this.FAKE_ID = this.FAKE_ID + 1;
    return character;
  }
}
