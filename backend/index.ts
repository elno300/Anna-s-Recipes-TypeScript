import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import multer from 'multer';
import path from 'path';
import { Request, Response } from 'express';
import recipesRoutes from './routes/recipesRoutes';
import client from './connectionDb';

dotenv.config();

const app = express();

// Middleware för att tolka JSON i request-body
app.use(express.json());

// Middleware för att hantera CORS
// app.use(cors());
app.use(
	cors({
		origin: 'http://localhost:4000', // Byt till frontend-URL vid produktion
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
	})
);

// Multer, saves files to server
const storage = multer.diskStorage({
	destination: function (req: Request, file, cb) {
		// Sätt destinationen där bilderna ska sparas
		cb(null, './uploads/');
	},
	filename: function (req: Request, file, cb) {
		// Generera ett unikt filnamn (kan anpassas)
		cb(null, Date.now() + path.extname(file.originalname)); // Filnamn + filändelse
	},
});

// Skapa Multer middleware
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
		// const instructions = JSON.stringify(instructions);
		const ingredientsJson = JSON.stringify(ingredients);

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
				ingredientsJson,
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
