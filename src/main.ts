import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from '@nestjs/common';
import * as debugModule from 'debug';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  console.log(process.env);
  
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe);

  const config = new DocumentBuilder()
                .setTitle('API de gerenciamento de alugueis')
                .setDescription('API criada com o intuito de gerenciar '
                +'informações acerca de um espaço de lazer com piscina chamado' +
                'Clau Piscina.')
                .setVersion('1.0')
                .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const debug = debugModule('app:*');
  debug.enabled = true;

  await app.listen(3000);
}
bootstrap();