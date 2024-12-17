'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import { Clock, Users, Tag } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import classnames from 'classnames';
import { StarRating } from '@/components/StarRating';

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

	return (
		<div className={classnames(styles.centerMainContainer, 'text-cyan-950')}>
			<article className="flex mt-32 flex-col sm:flex-row justify-evenly w-full max-w-7xl">
				<div className="container mx-auto px-4 sm:px-0 max-w-4xl">
					<AspectRatio ratio={8 / 7} className="bg-muted mb-6 rounded-lg">
						<Image
							src={`http://localhost:3000/uploads/${img_url}`}
							alt={name}
							fill
							className="rounded-lg object-cover"
						/>
					</AspectRatio>
				</div>

				<section className="container max-w-4xl flex flex-col align-items-center items-center pl-7 justify-center ">
					<div className=" text-start max-h-fit">
						<h2 className="text-4xl lg:text-5xl xl:text-7xl block font-magic">
							{name}
						</h2>
						<div className="flex gap-6 pt-4">
							<div className="flex">
								<Clock className="w-5 h-5 mr-2" />
								<p>{cook_time}</p>
							</div>
							<div className="flex">
								<Users className="w-5 h-5 mr-2" />
								<p> {servings} portioner</p>
							</div>
							<div className="flex">
								<Tag className="w-5 h-5 mr-2 " />
								<p> {course_name}</p>
							</div>
						</div>
						<p className="pt-4 pb-4 text-sm lg:text-xl">{description}</p>
						<StarRating rating={5} />
					</div>
				</section>
			</article>
			<article className="md:flex justify-evenly w-full max-w-7xl md:pt-10 md:pb-20">
				<section
					className={classnames('container pl-7', styles.ingredientsContainer)}
				>
					<h3 className="text-4xl lg:text-5xl xl:text-5xl block font-magic ">
						Ingredienser
					</h3>
					{ingredientsArray && (
						<ul className={classnames(styles.ingredients, 'pt-2 space-y-2')}>
							{ingredientsArray.map((ingredient, index) => (
								<li className="" key={index}>
									{ingredient}
								</li>
							))}
						</ul>
					)}
				</section>
				<section
					className={classnames(styles.instructionsContainer, 'container pl-7')}
				>
					<h3 className="text-4xl lg:text-5xl xl:text-5xl block font-magic">
						Instruktioner
					</h3>
					<div
						className={classnames(styles.instructions, 'pt-2 space-y-2')}
						dangerouslySetInnerHTML={{ __html: instructions }}
					/>
				</section>
			</article>
		</div>
	);
}
