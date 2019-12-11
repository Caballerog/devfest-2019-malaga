import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { DatabaseModule } from '../databaseModule/database.module';
import { Module } from '@nestjs/common';
import { characterProviders } from './entities/character.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CharactersController],
  providers: [CharactersService, ...characterProviders],
})
export class CharactersModule {}
