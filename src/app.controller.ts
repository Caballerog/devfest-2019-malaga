import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Character } from './models/character.interface';

@Controller('characters')
export class AppController {
  private CHARACTERS: Character[] = [];
  private FAKE_ID = 10000;

  @Get()
  characters(): Character[] {
    return this.CHARACTERS;
  }

  @Post()
  create(@Body('name') name: string) {
    const character: Character = {
      name,
      id: this.FAKE_ID,
    };
    this.CHARACTERS = [...this.CHARACTERS, character];
    this.FAKE_ID = this.FAKE_ID + 1;
    return character;
  }

  @Delete(':id')
  deleteById(@Param('id') id: string): Character {
    const characterID = parseInt(id, 10);
    const characterIndex = this.CHARACTERS.findIndex(
      character => character.id === characterID,
    );
    const character = this.CHARACTERS[characterIndex];
    this.CHARACTERS.splice(characterIndex, 1);
    return character;
  }

  @Put()
  updateById(@Body('id') id: string, 
             @Body('name') name: string): Character {
    const characterID = parseInt(id, 10);
    const character = this.CHARACTERS.find(
      character => character.id === characterID,
    );
    if (character) {
      character.name = name;
    }
    return character;
  }

  @Get(':id')
  findById(@Param('id') id: string): Character {
    const characterID = parseInt(id, 10); // Pipe
    return this.CHARACTERS.find(({ id }) => id === characterID);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string): Character[] {
    return this.CHARACTERS.filter(character => character.name.includes(name));
  }


}
