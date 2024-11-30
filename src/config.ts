import * as process from 'node:process';
import { config as envConfig } from 'dotenv';

envConfig();

export const config = {
  db: {
    pg: {
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      name: process.env.POSTGRES_DB,
    },
    mongo: {
      uri: process.env.MONGO_URI,
      name: process.env.MONGO_DB,
    },
  },
};

export type Config = typeof config;
