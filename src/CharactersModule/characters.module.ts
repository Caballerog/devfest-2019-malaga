import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
