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
import { CharactersService } from './characters.service';
@Controller('characters')
export class AppController {
  constructor(private charactersService: CharactersService) {}

  @Get()
  characters(): Character[] {
    return this.charactersService.findAll();
  }

  @Post()
  create(@Body('name') name: string) {
    return this.charactersService.create(name);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string): Character {
    const characterID = parseInt(id, 10);
    return this.charactersService.deleteById(characterID);
  }

  @Put()
  updateById(@Body('id') id: string, @Body('name') name: string): Character {
    const characterID = parseInt(id, 10);
    return this.charactersService.updateById(characterID, name);
  }

  @Get(':id')
  findById(@Param('id') id: string): Character {
    const characterID = parseInt(id, 10); // Pipe
    return this.charactersService.findById(characterID);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string): Character[] {
    return this.charactersService.findByName(name);
  }
}
