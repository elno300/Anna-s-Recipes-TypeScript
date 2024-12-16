'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import { Clock, Users, Tag } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export interface RecipeInterface {
	name: string;
	cook_time: string;
	description: string;
	instructions: string;
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
		return <p className="mt-32 text-center">Loading...</p>;
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

	let ingredientsArray: string[] = [];
	// ingredientsArray =JSON.parse(ingredients);
	if (typeof ingredients === 'string') {
		try {
			ingredientsArray = JSON.parse(ingredients);
		} catch (error) {
			console.error('Error parsing ingredients:', error);
		}
	} else if (Array.isArray(ingredients)) {
		ingredientsArray = ingredients; // Om ingredients redan är en array
	}

	console.log('ingredienser', ingredients);

	// flex-col justify-center align-middle text-center items-center
	return (
		<div className={styles.centerMainContainer}>
			<article className="flex mt-36 flex-col sm:flex-row justify-evenly font-avan w-full max-w-7xl">
				<div className="container mx-auto px-4 sm:px-0 max-w-4xl">
					<AspectRatio ratio={8 / 6} className="bg-muted mb-6 rounded-lg">
						<Image
							src={`http://localhost:3000/uploads/${img_url}`}
							alt={name}
							fill
							className="rounded-lg object-cover "
						/>
					</AspectRatio>
				</div>
				<section className="container px-4 max-w-4xl flex-col align-items-center ">
					<div className=" text-start max-h-fit pt-12">
						<h2 className="text-4xl sm:text-7xl block font-magic">{name}</h2>
						<p className="text-xl">{description}</p>
						<div className="flex gap-6 pt-6">
							<div className="flex">
								<Clock className="w-5 h-5 mr-2 text-gray-500" />
								<p>{cook_time}</p>
							</div>
							<div className="flex">
								<Users className="w-5 h-5 mr-2 text-gray-500" />
								<p> {servings} portioner</p>
							</div>
							<div className="flex">
								<Tag className="w-5 h-5 mr-2 text-gray-500" />
								<p> {course_name}</p>
							</div>
						</div>
					</div>
				</section>
			</article>
			<section className={styles.ingredientsContainer}>
				<h3 className="uppercase">Ingredienser</h3>
				{ingredientsArray && (
					<ul>
						{ingredientsArray.map((ingredient, index) => (
							<li key={index}>{ingredient}</li>
						))}
					</ul>
				)}
			</section>
			<section className={styles.instructionsContainer}>
				<h3 className="uppercase">Instruktioner</h3>
				<div
					className={styles.instructions}
					dangerouslySetInnerHTML={{ __html: instructions }}
				/>
			</section>
		</div>
	);
}
