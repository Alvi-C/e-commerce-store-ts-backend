import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  database_url: process.env.MONGO_URI,
  env_mode: process.env.NODE_ENV,
};
