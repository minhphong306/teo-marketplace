/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {envFilePath} from "./utils/env";
import cookieParser = require("cookie-parser");

async function bootstrap() {
  console.log('Env file path: ');
  console.log(envFilePath)

  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
