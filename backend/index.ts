// import cors from 'cors';
// import * as dotenv from 'dotenv';
// import express from 'express';
// import recipesRoutes from './routes/recipesRoutes';
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(recipesRoutes);

// app.listen(3000, () => {
// 	console.log('Webbtjänsten kan nu ta emot anrop.');
// });

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

// Middleware för att tolka JSON i request-body
app.use(express.json());

// Middleware för att hantera CORS
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post(
	'/api/new-recipe2',
	upload.single('image'),
	async (req: Request, response: Response) => {
		const { name, cook_time, description, servings, course_id } = req.body;
		// const img_url = req.file ? req.file.path : null;
		const img_url = req.file ? `${req.file.filename}` : null;
		console.log('Bildens sökväg i backend,', img_url);

		const { rows } = await client.query(
			`INSERT INTO recipes (name, cook_time, description, img_url, servings, course)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
			[name, cook_time, description, img_url, servings, course_id]
		);

		response.status(201).json(rows[0]);
	}
);

app.use(recipesRoutes);

app.listen(3000, () => {
	console.log('Webbtjänsten kan nu ta emot anrop.');
});
