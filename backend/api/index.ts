import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { loadEnv } from '../src/shared/env';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

export const createServer = async (expressInstance: express.Express) => {
  loadEnv();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.enableCors();
  await app.init();
};

createServer(server);

export default server;
