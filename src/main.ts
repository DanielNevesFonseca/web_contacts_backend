import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // config() Load dotenv VARS
  config();
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
    );
    
  const configSwagger = new DocumentBuilder()
    .setTitle('WebContactsAPI')
    .setDescription('The API for WebContactSite')
    .setVersion('1.0')
    .addTag('web')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
