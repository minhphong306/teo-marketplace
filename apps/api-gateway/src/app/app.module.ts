import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {PostModule} from "../modules/post/post.module";
import {ConfigModule} from "@nestjs/config";
import * as Joi from '@hapi/joi'
import {DatabaseModule} from "../modules/database/database.module";
import {envFilePath} from "../utils/env";

@Module({
  imports: [
    PostModule,
    ConfigModule.forRoot({
      envFilePath: envFilePath,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      })
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
