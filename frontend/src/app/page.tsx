'use client';
import { useState, useEffect, useContext } from 'react';
import RecipeCard from '@/components/RecipeCard';
import { RecipeInterface } from '@/utils/interface';
import Context from '@/Context';
import HeroModule from '@/components/HeroModule';
import styles from './page.module.css';

export default function Home() {
	const [recipes, setRecipes] = useState<RecipeInterface[]>([]);
	const context = useContext(Context);

	if (!context) {
		throw new Error('Context has not been provided!');
	}
	const { newRecipe } = context;

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const response = await fetch('http://localhost:3000/api/recipes');
				if (!response.ok) {
					throw new Error(`HTTP-fel! Status: ${response.status}`);
				}
				const result: RecipeInterface[] = await response.json();
				setRecipes(result);
			} catch (error) {
				console.error('Ett fel uppstod vid hämtning av recept:', error);
			}
		};

		fetchRecipes();
	}, [newRecipe]);

	const numberOfRecipes: number = recipes.length;

	return (
		<>
			<HeroModule />
			<section className=" w-screen justify-center">
				<section className={styles.pageTitle}>
					<div className={styles.titleWrapper}>
						<h2 className="text-2xl font-avant block uppercase">
							Blandade recept{' '}
						</h2>
						<p className="align-bottom">
							(<span> {numberOfRecipes}</span> st)
						</p>
					</div>
				</section>
				<section className="flex flex-wrap justify-center gap-4 pt-4 pb-8">
					{recipes[0] ? (
						recipes.map((recipe) => (
							<RecipeCard
								className="recipe-card"
								key={recipe.id}
								recipe={recipe}
							/>
						))
					) : (
						<p className="text-xl">Laddar recept...</p>
					)}
				</section>
			</section>
		</>
	);
}
