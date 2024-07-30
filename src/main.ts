import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove non-whitelisted properties
      forbidNonWhitelisted: true, // throw error if there is any non-whitelisted property
      transform: true, // transform incoming data to DTO
    }),
  );

  await app.listen(8000);
}
bootstrap();
