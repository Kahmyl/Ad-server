require('dotenv').config();

export const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  PORT,
  NODE_ENV,
} = process.env;