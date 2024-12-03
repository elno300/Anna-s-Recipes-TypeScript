'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import RemoveButton from './RemoveButton';
// Importera bilder
import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';
import image3 from '../assets/images/image3.jpg';

import styles from './RecipeCard.module.css';
import { RecipeInterface } from '@/utils/interface';

type ImgKey = 'image1' | 'image2' | 'image3';

const imageMap = {
	image1: image1,
	image2: image2,
	image3: image3,
};

interface RecipeProp {
	recipe: RecipeInterface;
	className?: string;
}

function RecipeCard(recipeProp: RecipeProp) {
	// Deconstruct recipe-object
	const { id, name, description, cook_time, servings, img_url, course_name } =
		recipeProp.recipe;
	const selectedImage = imageMap[img_url as ImgKey] || image1;

	return (
		<>
			<Card className="bg-slate-200 w-96 shadow-xl overflow-hidden">
				<div className={styles.imageContainer}>
					<img
						className={styles.recipeImage}
						src={selectedImage.src}
						alt={`Bild på ${name}`}
					/>
				</div>
				<CardHeader>
					<CardTitle>{name}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardContent className="flex justify-between bottom-0 ">
					<div>
						<p>Tillagningstid: {cook_time}</p>
						<p>Antal portioner: {servings}</p>
						<p>Kategori: {course_name}</p>
					</div>
					<RemoveButton id={id} />
				</CardContent>
			</Card>
		</>
	);
}

export default RecipeCard;
