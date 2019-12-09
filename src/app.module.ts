import { CharactersModule } from './CharactersModule/characters.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CharactersModule],
})
export class AppModule {}
