import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
  ValidationPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';

import { Character } from './models/character.interface';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dtos/create-character.dto';

import { AuthGuard } from '../shared/guards/auth.guard';
import { Roles } from '../shared/decorators/roles.decorator';

@Controller('characters')
@UseGuards(AuthGuard)
export class CharactersController {
  constructor(private charactersService: CharactersService) {}

  @Get()
  characters(): Promise<Character[]> {
    return this.charactersService.findAll();
  }

  @Post()
  @Roles('admin')
  @UsePipes(ValidationPipe)
  create(@Body() createCharacterDto: CreateCharacterDto): Promise<Character> {
    return this.charactersService.create(createCharacterDto);
  }

  @Delete(':id')
  @Roles('admin')
  deleteById(@Param('id', new ParseIntPipe()) id: number): Promise<Character> {
    return this.charactersService.deleteById(id);
  }

  @Put()
  @Roles('admin')
  updateById(
    @Body('id', new ParseIntPipe()) id: number,
    @Body('name') name: string,
  ): Promise<Character> {
    return this.charactersService.updateById(id, name);
  }
  @Get(':id')
  findById(@Param('id', new ParseIntPipe()) id: number): Promise<Character> {
    return this.charactersService.findById(id);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string): Promise<Character[]> {
    return this.charactersService.findByName(name);
  }
}
