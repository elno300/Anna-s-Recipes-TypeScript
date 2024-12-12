'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

export interface RecipeInterface {
	name: string; // Receptets namn
	cook_time: string; // Tillagningstid (ex. "45 min")
	description: string; // Beskrivning av receptet
	instructions: string[]; // Array av instruktioner för tillagning
	ingredients: string[]; // Array av ingredienser
	course_name: string; // Kurskategori för receptet (ex. "Huvudrätt")
	img_url: string; // URL till bilden för receptet
	servings: number; // Antal portioner receptet ger
}

export default function RecipePage() {
	const params = useParams();
	const { meal } = params;
	const decoded = decodeURIComponent(meal);

	const [recipe, setRecipe] = useState<RecipeInterface | null>(null);

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const response = await fetch(`http://localhost:3000/api/${decoded}`);
				const result: RecipeInterface = await response.json();
				setRecipe(result);
				// const fetchedRecipe = result;
				console.log('result :>> ', result);
			} catch (error) {
				console.error('Error fetching recipe:', error);
			}
		};

		fetchRecipe();
	}, [decoded]);

	if (!recipe) {
		return <p>Loading...</p>;
	}

	const {
		name,
		cook_time,
		description,
		instructions,
		ingredients,
		course_name,
		img_url,
		servings,
	} = recipe;

	return (
		<div className="font-avant text-green-500">
			<div className={styles.imageContainer}>
				<img
					className={styles.recipeImage}
					src={`http://localhost:3000/uploads/${img_url}`}
					alt={`Bild på ${name}`}
				/>
			</div>
			<h2 className="text-2xl font-avant block uppercase">{name}</h2>
			<p>{description}</p>
			<div>
				<p>Tillagningstid: {cook_time}</p>
				<p>Antal portioner: {servings}</p>
				<p>Kategori: {course_name}</p>
			</div>
			<div className="ingredients-container">
				<h2>Ingredienser</h2>
				<ul>
					{ingredients.map((ingredient, index) => (
						<li key={index}>{ingredient}</li>
					))}
				</ul>
			</div>
			<div className="instructions-container">
				<h2>Instruktioner</h2>
				<ul>
					{instructions.map((instruction, index) => (
						<li key={index}>{instruction}</li>
					))}
				</ul>
			</div>
		</div>
	);
}
