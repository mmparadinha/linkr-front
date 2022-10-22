import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const connection = new Pool({
    host: process.env.HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_URL,
})

// const databaseConfig = {
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// };

// const connection = new Pool(databaseConfig);

export default connection;