// Ett komplett end 2 end test frontend, backend and database
describe('My next project', function () {
	it('Annas recipes', function () {
		cy.visit('/');
	});
});

export interface RecipeInterface {
	id: number;
	name: string;
	cook_time: number;
	description: string;
	img_url: string;
	servings: number;
	course_name: number;
}

let counter: number;
describe('New Recipe Form', function () {
	it('Verify getting recipes work and how many of recipes', function () {
		cy.visit('/');

		cy.intercept('GET', 'http://localhost:3000/api/recipes').as('getRecipes');
		cy.wait(1000);
		cy.get('p').should('exist');
		cy.get('span')
			.invoke('text')
			.then((spanText) => {
				const spanValue = parseFloat(spanText);
				expect(spanValue).to.be.a('number');
				counter = spanValue;
			});
	});

	it('Verify adding a recipe works', function () {
		cy.visit('/addRecipe');
		// cy.get('#addRecipe').click();
		// cy.intercept('POST', 'http://localhost:3000/api/new-recipe2');
		// cy.wait('@addRecipeRequest').its('response.statusCode').should('eq', 201);

		cy.get('form').should('be.visible');
		cy.get('#title').type('Spagetti med köttfärsås');
		cy.get('#cookTime').type('30');
		cy.get('#category').select('Pasta');
		cy.get('#servings').select('3');
		cy.get('#description').type(
			'Favoritmat nummer ett! Alla - oavsett ålder - älskar spaghetti och köttfärssås! Här är ett smakfullt och pålitligt recept som du lyckas med. Servera gärna med riven parmesanost.'
		);
		cy.get('#instructions').type(
			'["Tillaga pastan enligt anvisningarna på förpackningen. Spara cirka ½ dl av pastavattnet.","Skala löken och rensa paprikan. Skär löken och paprikan i halvor och sedan i skivor. Skär broccolin i buketter. Skala och skär stammen i bitar.","Värm upp en vid kastrull på hög värme och tillsätt lite olja. Stek köttfärsen i cirka 1 minut på varje sida tills den får en stekyta. Dela blandfärsen i mindre bitar. Tillsätt löken, paprikan och broccolin och stek ytterligare 2–3 minuter. Tillsätt tomatsåsbasen och koka upp. Låt köttsåsen småkoka i cirka 5 minuter tills broccolin är mjuk. Tillsätt cirka ½ dl av pastavattnet i såsen. Smaka av med salt och peppar.","Toppa rätten med riven parmesan."] '
		);
		cy.get('#ingredients').type(
			'["1 lök" , "1 räd paprika", "400 gram krossade tomater", "1 broccoli", "500 gram köttfärs"]'
		);
		cy.get('button[type="submit"]').click();

		// cy.wait('@addRecipe', { timeout: 10000 });
		// cy.contains('Spagetti med köttfärsås').should('be.visible');
	});

	it('Check if the recipe was added', function () {
		cy.visit('/');
		cy.wait(1000); // Vänta på get-anropet
		cy.get('p').should('exist');
		console.log(counter);
		cy.get('span')
			.invoke('text')
			.then((spanValue) => {
				const spanNumber = parseInt(spanValue);
				if (isNaN(spanNumber)) {
					cy.log('The value is not a valid number');
				} else {
					// Compare with the local value
					expect(spanNumber).to.equal(counter + 1);
				}
			});
	});
});

// it('Check if Spagetti med köttfärsås was saved to the database', function () {
// 	cy.request('GET', 'http://localhost:3000/api/recipes').then((response) => {
// 		const recipes = response.body;
// 		const newRecipe = recipes.find(
// 			(recipe: RecipeInterface) => recipe.name === 'Spagetti med köttfärsås'
// 		);
// 		expect(newRecipe.name).to.equal('Spagetti med köttfärsås');
// 		cy.log('Recived recipes:', recipes);
// 	});
// });

//integrationstest
// 	it('Check if posting (mockad) data works using a integretion test', function () {
// 		cy.visit('/');
// 		cy.wait(1000); // Vänta på get-anropet
// 		const newRecipe = {
// 			name: 'Kyckling Alfredo',
// 			cook_time: '25 min',
// 			description: 'En krämig och god kyckling Alfredo med pasta och parmesan.',
// 			img_url: 'image3',
// 			servings: 3,
// 			course_id: 3,
// 		};
// 		cy.request('POST', 'http://localhost:3000/api/new-recipe', newRecipe).then(
// 			(response) => {
// 				expect(response.status).to.eq(201);
// 			}
// 		);
// 		cy.request('GET', 'http://localhost:3000/api/recipes').then((response) => {
// 			const recipes = response.body;
// 			cy.log('Recived recipes:', recipes);
// 		});
// 	});

// 	it('Check if it is possible to delete a recipe', function () {
// 		cy.visit('/');
// 		cy.wait(1000); // Vänta på get-anropet
// 		cy.contains('Buillabaise');
// 		cy.contains('Remove') // Hitta alla knappar med texten 'Remove'
// 			.last() // Välj den sista "Remove"-knappen
// 			.click();
// 		cy.wait(500);
// 		cy.contains('Continue').click();
// 	});
// });
