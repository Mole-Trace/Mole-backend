import { AppModule } from './app.module';
import redisConfig from './config/redis.config';
import { enableSwagger } from './plugin/swagger.plugin';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      url: redisConfig().URI,
    },
  });

  await app.startAllMicroservices();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await enableSwagger(app);

  await app.listen(3000);

  logger.log(`Server are Running in http://localhost:${3500}`, 'bootstrap');
  logger.log(
    `swagger are available at http://localhost:${3500}/${'swagger'}`,
    'swagger',
  );
}
bootstrap();
