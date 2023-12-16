import { NestFactory } from '@nestjs/core';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Hospital API')
    .setDescription('API para o sistema desenvolvido para a FETIN 2023')
    .setVersion('1.0')
    .addTag('Hospital')
    .addTag('Médico')
    .addTag('Paciente')
    .addTag('Setor')
    .addTag('Sala')
    .addTag('Registro de localização')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errorMessages = {};
        validationErrors.forEach((error) => {
          errorMessages[error.property] = Object.values(error.constraints).join(
            ', ',
          );
        });
        return new HttpException(
          {
            statuscode: HttpStatus.BAD_REQUEST,
            message: errorMessages,
          },
          HttpStatus.BAD_REQUEST,
        );
      },
      transform: true,
    }),
  );

  app.enableCors();

  await app.listen(process.env.PORT || 8000, '0.0.0.0');
}
bootstrap();
