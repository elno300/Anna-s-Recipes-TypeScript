import express from 'express';
import {
	getRecipes,
	getOneRecipe,
	createRecipe,
	deleteRecipe,
} from '../controllers/recipesController';

const router = express.Router();

router.get('/api/recipes', getRecipes);
router.get('/api/:name', getOneRecipe);
router.post('/api/new-recipe', createRecipe);
router.delete('/api/delete-recipe/:id', deleteRecipe);

export default router;
