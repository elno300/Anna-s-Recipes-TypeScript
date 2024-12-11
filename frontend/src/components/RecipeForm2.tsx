'use client';
import Context from '@/Context';
import { useContext, useState } from 'react';
import classnames from 'classnames';
import Image from 'next/image';
import { Button } from './ui/button';
import imageCompression from 'browser-image-compression';

// interface postRecipe {
// 	name: string;
// 	cook_time: string;
// 	description: string;
// 	img_url: string;
// 	servings: number;
// 	course_id: number;
// }

export default function RecipeForm1() {
	const [title, setTitle] = useState<string>('');
	const [cookTime, setCookTime] = useState<string>('');
	const [category, setCategory] = useState<string>('');
	const [servings, setServings] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [image, setImage] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const context = useContext(Context);
	const { setNewRecipe } = context;

	// Hantera filuppladdning
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] || null;

		if (file) {
			// Skapa en temporär URL för att visa bilden
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);
			setImage(file);
		}
	};

	//Function to compress image in browser before posting to backend.
	async function handleImageUpload(img: File) {
		console.log('originalFile instanceof Blob', img instanceof Blob); // true
		console.log(`originalFile size ${img.size / 1024 / 1024} MB`);

		const options = {
			maxSizeMB: 1,
			maxWidthOrHeight: 1920,
			useWebWorker: true,
		};
		try {
			const compressedFile = await imageCompression(img, options);
			console.log(
				'compressedFile instanceof Blob',
				compressedFile instanceof Blob
			); // true
			console.log(
				`compressedFile size ${compressedFile.size / 1024 / 1024} MB`
			); // smaller than maxSizeMB
			return compressedFile;
		} catch (error) {
			console.log(error, 'Det gick inte att omvandla bilden');
		}
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!context) {
			throw new Error('Context måste användas inom en Provider');
		}

		// Skapa FormData objektet
		const formData = new FormData();
		formData.append('name', title);
		formData.append('cook_time', cookTime);
		formData.append('description', description);
		formData.append('servings', servings);
		formData.append('course_id', category);
		// formData.append('user_id', userId);

		if (image) {
			console.log('Händer detta?????', image);
			const newImg = await handleImageUpload(image);
			if (newImg) {
				// Skapa en fil från Blob om det behövs
				const file = new File([newImg], image.name || 'compressed-image.jpg', {
					type: newImg.type,
				});
				formData.append('image', file); // Lägg till filen
			} else {
				console.error('Bilden kunde inte laddas upp korrekt.');
			}
		}

		try {
			const response = await fetch('http://localhost:3000/api/new-recipe2', {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				throw new Error('Kunde inte lägga till receptet');
			}

			const newRecipe = await response.json();
			console.log('Nytt recept tillagt:', newRecipe);
			setNewRecipe(title);

			// Töm alla inputfält efter framgång
			setTitle('');
			setCookTime('');
			setCategory('');
			setServings('');
			setDescription('');
			setImage(null);
		} catch (error) {
			console.error('Det gick inte att skapa recept:', error);
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className={classnames(
					'w-[90vw] border border-gray-300 rounded-lg p-6 shadow-md bg-white max-w-3xl mb-20'
					// styles.transparent
				)}
				encType="multipart/form-data" // Viktigt att sätta denna för uppladdning av filer
			>
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full px-3">
						<label
							htmlFor="title"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
						>
							Titel:
						</label>
						<input
							type="text"
							id="title"
							placeholder="Spagetti med köttfärsås"
							required
							className="rounded-lg appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 py-3 px-4 mb-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							value={title}
							onChange={(event) => setTitle(event.target.value)}
						/>
					</div>
				</div>
				<div className="flex flex-col -mx-3 mb-6 px-3">
					<label
						htmlFor="image"
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					>
						Lägg till bild:
					</label>
					{previewUrl ? (
						<div className="rounded-lg overflow-hidden w-full sm:w-[400px] h-[250px]">
							<Image
								src={previewUrl}
								width={400}
								height={300}
								alt="Picture of food"
								className="mb-2 bg-gray-200 items-center justify-center border border-gray-300 rounded-lg cover overflow-hidden"
								objectFit="cover"
							></Image>
						</div>
					) : (
						<div className="sm:w-[400px] h-[250px] w-full bg-gray-100 flex items-center justify-center border border-gray-300 rounded-lg mb-2 text-gray-400 ">
							<span>Välj en bild</span>
						</div>
					)}
					<input
						type="file"
						id="image"
						onChange={handleFileChange}
						className="
						appearance-none block py-3 mb-4 leading-tight focus:outline-none "
						onClick={() => document.getElementById('image')?.click()}
					/>
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
							className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 py-3 px-4 mb-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 rounded-lg"
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
							className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 rounded-lg"
							value={category}
							onChange={(event) => setCategory(event.target.value)}
						>
							<option value="" disabled className="text-gray-100">
								Välj kategori
							</option>
							<option value={1}>Dessert</option>
							<option value={2}>Gryta</option>
							<option value={3}>Gratäng</option>
							<option value={4}>Pasta</option>
							<option value={5}>Sallad</option>
							<option value={6}>Soppa</option>
						</select>
					</div>
					<div className="w-full md:w-1/3 px-3 mt-4 md:mt-0">
						<label
							htmlFor="servings"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Antal portioner:
						</label>
						<select
							id="servings"
							required
							className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 rounded-lg"
							value={servings}
							onChange={(event) => setServings(event.target.value)}
						>
							<option value="" disabled className="ttext-gray-400 ">
								Välj ett nummer
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
							Kort beskrivning:
						</label>
						<textarea
							id="description"
							placeholder="Skriv en kort beskrivning av receptet här..."
							required
							className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 py-3 px-4 mb-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-32 rounded-lg"
							value={description}
							onChange={(event) => setDescription(event.target.value)}
						/>
					</div>
				</div>
				<Button variant="secondary" type="submit">
					Lägg till recept
				</Button>
			</form>
		</>
	);
}
