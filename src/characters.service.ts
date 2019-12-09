import { Character } from './models/character.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CharactersService {
  private FAKE_ID = 10000;
  private characters: Character[] = [];

  findAll(): Character[] {
    return this.characters;
  }
  findById(characterID: number): Character {
    return this.characters.find(({ id }) => id === characterID);
  }
  findByName(name: string): Character[] {
    return this.characters.filter(character => character.name.includes(name));
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
    const character = this.characters[characterIndex];
    this.characters.splice(characterIndex, 1);
    return character;
  }
  create(name: string): Character {
    const character: Character = {
      name,
      id: this.FAKE_ID,
    };
    this.characters = [...this.characters, character];
    this.FAKE_ID = this.FAKE_ID + 1;
    return character;
  }
}
