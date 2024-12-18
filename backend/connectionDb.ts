import { Client } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();
// const client = new Client({
// 	connectionString: process.env.PGURI,
// 	ssl: {
// 		rejectUnauthorized: false, // Optional: Disable certificate verification for development .
// 		// require: true,
// 	},
// });
const client = new Client({
	connectionString: process.env.PGURI,
});

client
	.connect()
	.then(() => console.log('Connected to the database'))
	.catch((err) => console.error('Database connection error:', err));

export default client;
