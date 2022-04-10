import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {PostModule} from "../modules/post/post.module";
import {ConfigModule} from "@nestjs/config";
import * as Joi from '@hapi/joi'
import {DatabaseModule} from "../modules/database/database.module";
import {envFilePath} from "../utils/env";
import {AuthenticationModule} from "../modules/authentication/authentication.module";

@Module({
  imports: [
    PostModule,
    ConfigModule.forRoot({
      envFilePath: envFilePath,
      validationSchema: Joi.object({
        MYSQL_HOST: Joi.string().required(),
        MYSQL_PORT: Joi.number().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_PASSWORD: Joi.string().required(),
        MYSQL_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.number().required(),
      })
    }),
    DatabaseModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
