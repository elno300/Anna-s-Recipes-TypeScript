import RecipeCard from '../../src/components/RecipeCard';

describe('<RecipeCard/>', () => {
	it('Show 3 cards with recipes', () => {
		const mockRecipe = {
			id: 1,
			name: 'Spagetti Carbonara',
			cook_time: '30 minutes',
			description: 'En klassisk italiensk rätt.',
			img_url: 'image5.jpg',
			servings: 4,
			course_name: 1,
		};
		cy.mount(<RecipeCard recipe={mockRecipe} />);
		cy.get('#CardTitle').should('contain.text', 'Spagetti Carbonara');
		cy.get('#CardDescription').should(
			'contain.text',
			'En klassisk italiensk rätt.'
		);
	});
});
