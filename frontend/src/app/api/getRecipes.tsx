import { RecipeInterface } from '@/utils/interface';

export async function getRecipes(): Promise<RecipeInterface[] | null> {
	try {
		const response = await fetch('http://localhost:3000/api/recipes');

		if (!response.ok) {
			throw new Error(`HTTP-fel! Status: ${response.status}`);
		}
		const result: RecipeInterface[] = await response.json();

		return result;
	} catch (error) {
		console.error('Ett fel uppstod vid hämtning av recept:', error);

		return null;
	}
}
