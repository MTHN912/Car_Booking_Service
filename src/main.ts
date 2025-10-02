import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { writeFileSync } from 'fs';
import helmet from 'helmet';
import * as YAML from 'yaml';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/exception-filter/all.exception.filter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet(),
  );
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.use(cookieParser());
  app.enableCors({
    origin: "http://localhost:3001",
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  writeFileSync('./swagger-spec.json', JSON.stringify(document, null, 2));

  writeFileSync('./swagger-spec.yaml', YAML.stringify(document));

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
