import Page from '../../src/app/page';
import { RecipeInterface } from '../../src/utils/interface';

// Här används mock data från en fixtures file (recipes.json)
// Koden nedan ska hämta de 3 recpeten som finns i json filen, en "låtsas /tillfällig databas kan man säga" Detta kallas mockning.

describe('<Page/>', () => {
	it('renders recipes', () => {
		// Ladda data från fixtures
		cy.fixture('recipes').then((json) => {
			// Mocka GET-anropet
			cy.intercept('GET', 'http://localhost:3000/api/recipes', json).as(
				'recipes'
			);
		});
		cy.wait(1000);
		cy.mount(<Page />);

		// Vänta på att mockad data laddas
		cy.wait('@recipes');
		cy.wait(1000);
		cy.get('span').then(($span) => {
			const spanValue = $span.text(); // Hämtar textvärdet från span
			cy.log(spanValue); // Loggar värdet för att verifiera om värdet är 3 så stämmer allt eftersom jag skapade 3 recept i jsonfilen :)
			cy.fixture('recipes').then((recipes: RecipeInterface[]) => {
				recipes.forEach((recipe) => {
					cy.contains(recipe.name).should('exist');
				});
			});
			cy.wait(1000);
		});
	});
});
