import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import multer from 'multer';
import path from 'path';
import { Request, Response } from 'express';
import recipesRoutes from './routes/recipesRoutes';

// import client from './connectionDb';

import { Client } from 'pg';
// import * as dotenv from 'dotenv';
dotenv.config();

const client = new Client({
	connectionString: process.env.PGURI,
});

client
	.connect()
	.then(() => console.log('Connected to the database'))
	.catch((err) => console.error('Database connection error:', err));

client.on('error', (err) => {
	console.error('PostgreSQL client error:', err);
});

export default client;
dotenv.config();

const app = express();

app.use(express.json());

// Middleware för att hantera CORS
// app.use(cors());
app.use(
	cors({
		origin: 'http://localhost:4000',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
	})
);

// Multer, saves files to server
const storage = multer.diskStorage({
	destination: function (req: Request, file, cb) {
		cb(null, './uploads/');
	},
	filename: function (req: Request, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

// Multer middleware
const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post(
	'/api/new-recipe2',
	upload.single('image'),
	async (req: Request, response: Response) => {
		const {
			name,
			cook_time,
			description,
			servings,
			course_id,
			instructions,
			ingredients,
			user_id,
		} = req.body;

		const validUserId = user_id ? user_id : null;
		console.log(req.body);

		const img_url = req.file ? `${req.file.filename}` : null;
		console.log('Bildens sökväg i backend,', img_url);

		const { rows } = await client.query(
			`INSERT INTO recipes (name, cook_time, description, img_url, servings, course, instructions, ingredients, user_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
			[
				name,
				cook_time,
				description,
				img_url,
				servings,
				course_id,
				instructions,
				ingredients,
				validUserId,
			]
		);

		response.status(201).json(rows[0]);
	}
);

app.use(recipesRoutes);

app.listen(3000, () => {
	console.log('Webbtjänsten kan nu ta emot anrop.');
});
