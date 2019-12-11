import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Inject,
} from '@nestjs/common';

import { Character } from './models/character.interface';
import { CreateCharacterDto } from './dtos/create-character.dto';
import { NotCharacterException } from './exceptions/not-character-exception';
import { RepeatCharacterException } from './exceptions/repeat-character-exception';
import { Repository } from 'typeorm';

@Injectable()
export class CharactersService {
  constructor(
    @Inject('CharacterRepositoryToken')
    private readonly charactersRepository: Repository<Character>,
  ) {
    /*   this.fake_characters.forEach(character =>
      this.charactersRepository.insert(character).catch(() => {}),
    ); */
  }
  /*   private readonly fake_characters: Character[] = [
    { id: 10000, name: 'Son Goku' },
    { id: 10001, name: 'Vegetta' },
    { id: 10002, name: 'Yamcha' },
    { id: 10003, name: 'Krilim' },
  ]; */

  findAll(): Promise<Character[]> {
    return this.charactersRepository.find();
  }
  async findById(characterID: number): Promise<Character> {
    const character = await this.charactersRepository.findOne(characterID);
    if (!character) {
      throw new HttpException(
        'Characters Service: Character not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return character;
  }
  async findByName(name: string): Promise<Character[]> {
    const [characters, charactersCount] = await this.charactersRepository
      .createQueryBuilder('characters')
      .select()
      .where('characters.name like :name', { name: `%${name}%` })
      .getManyAndCount();
    if (charactersCount === 0) {
      throw new NotFoundException('Characters Service: Character not found');
    }
    return characters;
  }
  async updateById(characterID: number, name: string): Promise<Character> {
    const character = {
      name,
      id: characterID,
    };
    await this.charactersRepository.update(characterID, character);
    return character;
  }
  async deleteById(characterID: number): Promise<Character> {
    const character = await this.findById(characterID);
    if (!character) {
      throw new NotCharacterException(characterID);
    }
    await this.charactersRepository.delete(characterID);
    return character;
  }
  async create({ name }: CreateCharacterDto): Promise<Character> {
    try {
      await this.charactersRepository.insert({ name });
    } catch {
      throw new RepeatCharacterException({ name } as Character);
    }
    return this.findOneByName(name);
  }
  async findOneByName(name): Promise<Character> {
    return this.charactersRepository.findOne({
      name,
    });
  }
}
