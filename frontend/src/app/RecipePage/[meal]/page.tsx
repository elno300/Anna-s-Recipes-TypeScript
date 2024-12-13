'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
// import styles from './page.module.css';
import Image from 'next/image';
import { Clock, Users, Tag } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export interface RecipeInterface {
	name: string;
	cook_time: string;
	description: string;
	instructions: string[];
	ingredients: string[];
	course_name: string;
	img_url: string;
	servings: number;
}

export default function RecipePage() {
	const params = useParams();
	const meal = params.meal as string;
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

	console.log(ingredients);

	return (
		<div className="font-avant text-green-500">
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				<AspectRatio ratio={16 / 9} className="bg-muted mb-6">
					<Image
						src={`http://localhost:3000/uploads/${img_url}`}
						alt={name}
						fill
						className="rounded-lg object-cover"
					/>
				</AspectRatio>
			</div>
			{/* <div className={styles.imageContainer}>
				<img
					className={styles.recipeImage}
					src={`http://localhost:3000/uploads/${img_url}`}
					alt={`Bild på ${name}`}
				/>
			</div> */}
			<h2 className="text-2xl font-avant block uppercase">{name}</h2>
			<p>{description}</p>
			<div>
				<Clock className="w-5 h-5 mr-2 text-gray-500" />
				<p>Tillagningstid: {cook_time}</p>
				<Users className="w-5 h-5 mr-2 text-gray-500" />
				<p>Antal portioner: {servings}</p>
				<Tag className="w-5 h-5 mr-2 text-gray-500" />
				<p>Kategori: {course_name}</p>
			</div>
			<div className="ingredients-container">
				<h2>Ingredienser</h2>
				{ingredients && (
					<ul>
						{Object.values(ingredients).map((ingredient, index) => (
							<li key={index}>{ingredient}</li>
						))}
					</ul>
				)}
			</div>
			<div className="instructions-container">
				<h2>Instruktioner</h2>
				<ul>
					{Object.values(instructions).map((instruction, index) => (
						<li key={index}>{instruction}</li>
					))}
				</ul>
			</div>
		</div>
	);
}
