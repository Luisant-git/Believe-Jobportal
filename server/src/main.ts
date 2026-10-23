import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { PrismaClientExceptionFilter } from './filters/prisma-client-exception.filter';
import * as basicAuth from 'express-basic-auth';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('JobPoratal')
    .setDescription('The JobPortal API description')
    .setVersion('1.0')
    .addTag('Jobportal')
    .addBearerAuth()
    .build();

  app.use(
    ['/swagger'],
    basicAuth({
      users: { [process.env.SWAGGER_USER || 'admin']: process.env.SWAGGER_PASS || 'password123' },

      challenge: true,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api/v1');
  app.enableShutdownHooks();

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new PrismaClientExceptionFilter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );



  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.use((req, res, next) => {
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );

    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
  });

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  await app.listen(process.env.PORT || 3100);
  // console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
