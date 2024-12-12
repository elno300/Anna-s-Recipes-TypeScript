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
	id?: number;
	name: string;
	cook_time?: string;
	description: string;
	img_url?: string;
	servings?: number;
	course_id?: number;
	instructions: string[];
	ingredients: string[];
	user_id?: number;
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
		instructions,
		ingredients,
		user_id,
	}: CreateRecipes = _request.body;
	const validUserId = user_id ? user_id : null;
	console.log(_request.body);
	const instructionsJson = JSON.stringify(instructions);
	const ingredientsJson = JSON.stringify(ingredients);

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
			instructionsJson,
			ingredientsJson,
			validUserId,
		]
	);
	response.status(201).json(rows[0]);
};

export const deleteRecipe = async (
	_request: Request,
	response: Response
): Promise<void> => {
	const id = _request.params.id;

	const recipeId = Number(id);
	console.log(recipeId);
	if (!id) {
		response
			.status(400)
			.json({ error: `Receptet med idt: ${id}, hittades inte.` });
	}
	try {
		await client.query('DELETE FROM recipes WHERE id = $1', [Number(id)]);
		response.status(200).json({ message: `Receptet med idt ${id} är raderat` });
	} catch (error) {
		console.log('Problem med att ta bort receptet', error);
		response.status(500);
		// .json({ error: 'Det gick inte att ta bort receptet' });
	}
};
