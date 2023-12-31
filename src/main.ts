import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

import * as passport from 'passport'; // Use the correct import syntax

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(new ValidationPipe());
  app.use(passport.initialize());

  await app.listen(5000);
}
bootstrap();
