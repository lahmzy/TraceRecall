import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loadEnv } from './shared/env';

async function bootstrap() {
  loadEnv();

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);
}

void bootstrap();
