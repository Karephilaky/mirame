import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const pool = new Pool({
  user: process.env.DB_USER || 'ur7kr2k7ybolqjrqftgq',
  host: process.env.DB_HOST || 'btvuslpxgb1yuxanlpql-postgresql.services.clever-cloud.com',
  database: process.env.DB_NAME || 'tvuslpxgb1yuxanlpql',
  password: process.env.DB_PASSWORD || 'SDbW0buOyBvhO8Fevt44p5BnqLqqZt',
  port: Number(process.env.DB_PORT) || 50013,
});

export default pool; 