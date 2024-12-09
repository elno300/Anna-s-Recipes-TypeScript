import client from '../connectionDb';
import { Request, Response } from 'express';

interface RecipeInterface {
	id: number;
	name: string;
	cook_time: string;
	description: string;
	img_url: string;
	servings: number;
	course_name: number;
}

interface CreateRecipes {
	name: string;
	cook_time: string;
	description: string;
	img_url: string;
	servings: number;
	course_id: number;
}

export const getRecipes = async (
	_request: Request,
	response: Response
): Promise<void> => {
	try {
		const { rows } = await client.query<RecipeInterface>(
			'SELECT recipes.id, recipes.name, recipes.cook_time, recipes.description, recipes.img_url, recipes.servings, courses.name AS course_name FROM recipes INNER JOIN courses ON recipes.course = courses.id'
		);
		response.json(rows);
		console.log('rows[0] :>> ', rows[0]);
	} catch (error) {
		response.status(500).json({ error: 'Det gick inte att hämta recepten' });
	}
};

// Typ för Request där body har strukturen CreateRecipes
type RequestWithBody<T> = Request<{}, {}, T>;

export const createRecipe = async (
	_request: RequestWithBody<CreateRecipes>,
	response: Response
): Promise<void> => {
	const {
		name,
		cook_time,
		description,
		img_url,
		servings,
		course_id,
	}: CreateRecipes = _request.body;

	const { rows } = await client.query(
		`INSERT INTO recipes (name, cook_time, description, img_url, servings, course)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
		[name, cook_time, description, img_url, servings, course_id]
	);
	response.status(201).json(rows[0]);
};

export const deleteRecipe = async (_request: Request, response: Response) => {
	const id = _request.params.id;

	const recipeId = Number(id);
	console.log(recipeId);
	if (!id) {
		return response
			.status(400)
			.json({ error: `Receptet med idt: ${id}, hittades inte.` });
	}
	try {
		await client.query('DELETE FROM recipes WHERE id = $1', [Number(id)]);
		return response
			.status(200)
			.json({ message: `Receptet med idt ${id} är raderat` });
	} catch (error) {
		console.log(error);
		return response
			.status(500)
			.json({ error: 'Det gick inte att ta bort receptet' });
	}
};

// app.post(
// 	'/api/new-recipe2',
// 	upload.single('image'),
// 	(req: Request, res: Response) => {
// 		// Här kan du få tillgång till både textdata och filen
// 		const { name, cook_time, description, servings, course_id } = req.body;
// 		const img_url = req.file ? req.file.path : null; // Spara sökvägen till filen

// 		// Här kan du spara dessa data i din databas, eller göra något med filen
// 		const newRecipe = {
// 			name,
// 			cook_time,
// 			description,
// 			img_url, // Bildens sökväg
// 			servings,
// 			coures: course_id,
// 		};

// 		// Simulera att spara i databas och skicka tillbaka data
// 		res.json(newRecipe);
// 	}
// );
