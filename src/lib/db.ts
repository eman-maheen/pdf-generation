import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'profiles',
    password: 'new_password',
    port: 5432,
});
