import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from '~/libs/swagger';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { AppModule } from '~/modules/app';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  patchNestjsSwagger();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ZodValidationPipe());

  await app.listen(4000);
}
bootstrap();
