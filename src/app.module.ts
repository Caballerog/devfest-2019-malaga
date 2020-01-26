import * as cors from 'cors';

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { CharactersModule } from './CharactersModule/characters.module';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';

const routes = {
  ALL: {
    path: '*',
    method: RequestMethod.ALL,
  },
  ONLY_GET: {
    path: '*',
    method: RequestMethod.GET,
  },
};
@Module({
  imports: [CharactersModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors())
      .forRoutes(routes.ALL)
      .apply(LoggerMiddleware)
      .forRoutes(routes.ONLY_GET);
  }
}
