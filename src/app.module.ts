import { AppController } from './app.controller';
import { CharactersService } from './characters.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [CharactersService],
})
export class AppModule {}
