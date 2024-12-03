'use client';
import Context from '@/Context';
import { useContext, useState } from 'react';
import styles from './RecipeForm.module.css';
import classnames from 'classnames';

interface postRecipe {
	name: string;
	cook_time: string;
	description: string;
	img_url: string;
	servings: number;
	course_id: number;
}

export default function RecipeForm() {
	const [title, setTitle] = useState<string>('');
	const [cookTime, setCookTime] = useState<string>('');
	const [category, setCategory] = useState<string>('');
	const [servings, setServings] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	const context = useContext(Context);
	const { setNewRecipe } = context;

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!context) {
			throw new Error('Context måste användas inom en Provider');
		}

		const recipeData: postRecipe = {
			name: title,
			cook_time: cookTime,
			description,
			img_url: 'image1', // För enkelhetens skull
			servings: parseInt(servings),
			course_id: parseInt(category),
		};

		try {
			const response = await fetch('http://localhost:3000/api/new-recipe', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(recipeData),
			});

			if (!response.ok) {
				throw new Error('Kunde inte lägga till receptet');
			}

			const newRecipe = await response.json();
			console.log('Nytt recept tillagt:', newRecipe);
			setNewRecipe(title);

			setTitle('');
			setCookTime('');
			setCategory('');
			setServings('');
			setDescription('');
		} catch (error) {
			console.error('det gick inte att skapa recept', error);
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className={classnames(
					'max-w-8xl border border-gray-300 rounded-lg p-6 shadow-md mt-8',
					styles.transparent
				)}
			>
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full px-3">
						<label
							htmlFor="title"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Titel:
						</label>
						<input
							type="text"
							id="title"
							placeholder="Spagetti med köttfärsås"
							required
							className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 py-3 px-4 mb-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							value={title}
							onChange={(event) => setTitle(event.target.value)}
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full md:w-1/3 px-3">
						<label
							htmlFor="cookTime"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Tillagningstid:
						</label>
						<input
							type="text"
							id="cookTime"
							placeholder="60 min"
							required
							className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 py-3 px-4 mb-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							value={cookTime}
							onChange={(event) => setCookTime(event.target.value)}
						/>
					</div>
					<div className="w-full md:w-1/3 px-3">
						<label
							htmlFor="category"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Kategori:
						</label>
						<select
							id="category"
							required
							className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							value={category}
							onChange={(event) => setCategory(event.target.value)}
						>
							<option value="" disabled className="text-gray-100">
								Sallad
							</option>
							<option value={1}>Dessert</option>
							<option value={2}>Gryta</option>
							<option value={3}>Gratäng</option>
							<option value={4}>Pasta</option>
							<option value={5}>Sallad</option>
							<option value={6}>Soppa</option>
						</select>
					</div>
					<div className="w-full md:w-1/3 px-3">
						<label
							htmlFor="servings"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Antal portioner:
						</label>
						<select
							id="servings"
							required
							className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							value={servings}
							onChange={(event) => setServings(event.target.value)}
						>
							<option value="" disabled>
								1
							</option>
							{[...Array(8)].map((_, i) => (
								<option key={i} value={i + 1}>
									{i + 1}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full px-3">
						<label
							htmlFor="description"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Beskrivning:
						</label>
						<textarea
							id="description"
							placeholder="Skriv en kort beskrivning av receptet här..."
							required
							className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 py-3 px-4 mb-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-32"
							value={description}
							onChange={(event) => setDescription(event.target.value)}
						/>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<button
						type="submit"
						className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4"
					>
						Lägg till nytt recept
					</button>
				</div>
			</form>
		</>
	);
}
