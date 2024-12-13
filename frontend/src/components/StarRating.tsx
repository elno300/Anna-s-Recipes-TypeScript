import { Star } from 'lucide-react';

interface RecipeRatingProps {
	rating: number;
	showNumber?: boolean;
}

export function StarRating({ rating, showNumber = true }: RecipeRatingProps) {
	return (
		<div className="flex items-center gap-2">
			<div className="flex">
				{[1, 2, 3, 4, 5].map((star) => (
					<Star
						key={star}
						className={`w-5 h-5 ${
							star <= rating ? 'fill-green-700 text-green-700' : 'text-gray-300'
						}`}
					/>
				))}
			</div>
			{showNumber && <span className="text-gray-600">{rating}</span>}
		</div>
	);
}
