import Image from 'next/image';
import { Clock, Users, Leaf, Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
// import { RecipeHeader } from '../components/recipe-header';
import { StarRating } from '@/components/StarRating';

export default function RecipePage() {
	const recipe = {
		title: 'Vintersallad med grönkål, apelsin och valnötter',
		description:
			'En härlig sallad till buffén! Grön- och rödkål är basen och sen fylls det på med godsaker som apelsin, valnötter och salladost.',
		image: '/placeholder.svg?height=600&width=800',
		cookingTime: '30 min',
		servings: 6,
		category: 'Vegetariskt',
		author: {
			name: 'Sandra Palmqvist',
			image: '/placeholder.svg?height=100&width=100',
		},
		rating: 5,
		ingredients: [
			'300 g grönkål',
			'1/4 rödkål',
			'2 apelsiner',
			'100 g valnötter',
			'150 g salladost',
			'2 msk olivolja',
			'1 msk honung',
			'Salt och peppar',
		],
		instructions: [
			'Strimla grönkål och rödkål fint.',
			'Skala apelsinerna och skär i skivor.',
			'Rosta valnötterna lätt i en torr stekpanna.',
			'Blanda grönkål och rödkål i en stor skål.',
			'Tillsätt apelsinskivor och valnötter.',
			'Smula över salladsosten.',
			'Blanda olivolja och honung, ringla över salladen.',
			'Smaka av med salt och peppar.',
		],
	};

	return (
		<div className="min-h-screen bg-white">
			{/* <RecipeHeader /> */}

			<main className="container mx-auto px-4 py-8 max-w-5xl">
				<div className="grid md:grid-cols-[2fr,1fr] gap-8">
					<div>
						<div className="relative aspect-[4/3] mb-6">
							<Image
								src={recipe.image}
								alt={recipe.title}
								fill
								className="rounded-lg object-cover"
								priority
							/>
						</div>

						<div className="flex items-start gap-4 mb-6">
							<Image
								src={recipe.author.image}
								alt={recipe.author.name}
								width={48}
								height={48}
								className="rounded-full"
							/>
							<div>
								<h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
								<p className="text-gray-600">{recipe.description}</p>
							</div>
						</div>

						<div className="flex flex-wrap items-center gap-6 mb-8 text-sm">
							<div className="flex items-center gap-2">
								<Users className="w-5 h-5 text-gray-500" />
								<span>{recipe.servings} bufféportioner</span>
							</div>
							<div className="flex items-center gap-2">
								<Clock className="w-5 h-5 text-gray-500" />
								<span>{recipe.cookingTime}</span>
							</div>
							<div className="flex items-center gap-2">
								<Leaf className="w-5 h-5 text-gray-500" />
								<span>{recipe.category}</span>
							</div>
						</div>

						<div className="flex items-center justify-between mb-8">
							<StarRating rating={recipe.rating} />
							<Button variant="outline" className="gap-2">
								<Heart className="w-4 h-4" />
								Spara
							</Button>
						</div>

						<div className="grid md:grid-cols-2 gap-8">
							<div>
								<h2 className="text-xl font-semibold mb-4">Ingredienser</h2>
								<ul className="space-y-2">
									{recipe.ingredients.map((ingredient, index) => (
										<li key={index} className="flex items-center gap-2">
											<span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
											{ingredient}
										</li>
									))}
								</ul>
							</div>
							<div>
								<h2 className="text-xl font-semibold mb-4">Gör så här</h2>
								<ol className="space-y-4">
									{recipe.instructions.map((step, index) => (
										<li key={index} className="flex gap-4">
											<span className="font-medium text-gray-400">
												{index + 1}.
											</span>
											<span>{step}</span>
										</li>
									))}
								</ol>
							</div>
						</div>
					</div>

					<aside className="hidden md:block">
						{/* Placeholder for sidebar content */}
						<div className="bg-gray-50 rounded-lg p-6">
							<h3 className="font-semibold mb-4">Fler vintriga recept</h3>
							<div className="space-y-4">
								{[1, 2, 3].map((i) => (
									<div key={i} className="flex gap-3">
										<div className="relative w-20 h-20">
											<Image
												src="/placeholder.svg?height=80&width=80"
												alt="Recipe thumbnail"
												fill
												className="rounded object-cover"
											/>
										</div>
										<div>
											<h4 className="font-medium">Vintersoppa med rotsaker</h4>
											<StarRating rating={5} showNumber={false} />
										</div>
									</div>
								))}
							</div>
						</div>
					</aside>
				</div>
			</main>
		</div>
	);
}
