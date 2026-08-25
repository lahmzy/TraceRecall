import { config } from 'dotenv';

export function loadEnv() {
  config();
}

export function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}
