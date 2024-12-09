'use client';
import { useState, useEffect, useContext } from 'react';
import RecipeCard from '@/components/RecipeCard';
import { RecipeInterface } from '@/utils/interface';
import Context from '@/Context';
import HeroModule from '@/components/HeroModule';

export default function Home() {
	const [recipes, setRecipes] = useState<RecipeInterface[]>([]);
	const context = useContext(Context);

	if (!context) {
		throw new Error('Context has not been provided!');
	}
	const { newRecipe } = context;

	useEffect(() => {
		fetch('http://localhost:3000/api/recipes')
			.then((response) => response.json())
			.then((result: RecipeInterface[]) => {
				console.log(result[0].name);
				setRecipes(result);
			});
	}, [newRecipe]);

	// const numberOfRecipes: number = recipes.length;

	return (
		<>
			<HeroModule />
			<section className=" w-screen justify-center ">
				{/* <RecipeForm /> */}
				{/* <p>
					<span>{numberOfRecipes}</span>:a recept
				</p> */}
				<section className="flex flex-wrap justify-center gap-4 pt-4 pb-8">
					{recipes &&
						recipes.map((recipe) => (
							<RecipeCard
								className="recipe-card"
								key={recipe.id}
								recipe={recipe}
							/>
						))}
				</section>
			</section>
		</>
	);
}
