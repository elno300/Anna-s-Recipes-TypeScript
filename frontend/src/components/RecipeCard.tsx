'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import RemoveButton from './RemoveButton';
import styles from './RecipeCard.module.css';
import { RecipeInterface } from '@/utils/interface';

interface RecipeProp {
	recipe: RecipeInterface;
	className?: string;
}

function RecipeCard(recipeProp: RecipeProp) {
	// Deconstruct recipe-object
	const { id, name, description, cook_time, servings, img_url, course_name } =
		recipeProp.recipe;

	let selectedImage;
	if (img_url === 'image1' || img_url === 'image2' || img_url === 'image3') {
		selectedImage = `http://localhost:3000/uploads/${img_url}.jpg`;
	} else {
		selectedImage = `http://localhost:3000/uploads/${img_url}`;
	}

	return (
		<>
			<Card className="bg-slate-200 sm:w-96 shadow-xl overflow-hidden">
				<div className={styles.imageContainer}>
					<img
						className={styles.recipeImage}
						src={selectedImage}
						alt={`Bild på ${name}`}
					/>
				</div>
				<CardHeader>
					<CardTitle id='CardTitle'>{name}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardContent className="flex justify-between bottom-0 text-sm">
					<div>
						<p>Tillagningstid: {cook_time}</p>
						<p>Antal portioner: {servings}</p>
						<p>Kategori: {course_name}</p>
					</div>
					{/* To make it impossible to remove all cards */}
					{name !== 'Bouillabaisse' && <RemoveButton id={id} />}
				</CardContent>
			</Card>
		</>
	);
}

export default RecipeCard;
