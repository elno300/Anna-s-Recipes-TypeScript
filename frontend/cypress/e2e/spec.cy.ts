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
describe('Create new recipe', function () {
	it('Should retrieve the list of recipes and verify the counts', function () {
		cy.visit('/');
		cy.intercept('GET', 'http://localhost:3000/api/recipes').as('getRecipes');
		cy.wait('@getRecipes');
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

	it('Should allow adding a new recipe', function () {
		cy.visit('/addRecipe');
		cy.get('form').should('be.visible');
		cy.get('#title').type('Spagetti med köttfärsås');
		// cy.fixture('image5.jpg', 'base64').then((fileContent) => {
		// 	cy.get('input[type="file"]').attachFile({
		// 		fileContent,
		// 		fileName: 'image5.jpg',
		// 		mimeType: 'image/jpeg',
		// 		encoding: 'base64',
		// 	});
		// });
		cy.get('#cookTime').type('30');
		cy.get('#category').select('Pasta');
		cy.get('#servings').select('3');
		cy.get('#description').type(
			'Favoritmat nummer ett! Alla - oavsett ålder - älskar spaghetti och köttfärssås! Här är ett smakfullt och pålitligt recept som du lyckas med. Servera gärna med riven parmesanost.'
		);
		// 	it('Types text with line breaks into a textarea', () => {
		// 		cy.visit('URL_TILL_DIN_SIDA'); // Byt ut mot URL till din testapplikation

		// 		// Hitta textområdet och skriv text med radbrytningar
		// 		cy.get('textarea').type(
		// 			'Första raden{enter}Andra raden{enter}Tredje raden'
		// 		);
		// 	});
		// });
		cy.get('#instructions').type(
			'Tillaga pastan enligt anvisningarna på förpackningen.\nSpara cirka 1/2 dl av pastavattnet.\nSkala löken och rensa paprikan. Skär löken och paprikan i halvor och sedan i skivor. \nSkär broccolin i buketter. Skala och skär stammen i bitar.\nVärm upp en vid kastrull på hög värme och tillsätt lite olja. Stek köttfärsen i cirka 1 minut på varje sida tills den får en stekyta.\nDela blandfärsen i mindre bitar. Tillsätt löken, paprikan och broccolin och stek ytterligare 2-3 minuter. Tillsätt tomatsåsbasen och koka upp.\nLåt köttsåsen småkoka i cirka 5 minuter tills broccolin är mjuk.\nTillsätt cirka 1/2 dl av pastavattnet i såsen. Smaka av med salt och peppar.\nToppa rätten med riven parmesan.'
		);
		cy.get('#ingredients').type(
			'1 lök \n1 räd paprika \n400 gram krossade tomater \n1 broccoli \n500 gram köttfärs'
		);
		cy.get('button[type="submit"]').click();
	});

	it('Should confirm the recipe count increases after adding a new recipe', function () {
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

	it('Should confirm that Spagetti med köttfärsås was saved to the database', function () {
		cy.request('GET', 'http://localhost:3000/api/recipes').then((response) => {
			const recipes = response.body;
			const newRecipe = recipes.find(
				(recipe: RecipeInterface) => recipe.name === 'Spagetti med köttfärsås'
			);
			expect(newRecipe.name).to.equal('Spagetti med köttfärsås');
			cy.log('Recived recipes:', recipes);
		});
	});
});

// integrationstest
describe('Integrationtest, posting "mockad" data', function () {
	it('Check if posting (mockad) data works using a integretion test', function () {
		cy.visit('/');
		cy.wait(1000); // Vänta på get-anropet
		const newRecipe = {
			name: 'Kyckling Alfredo',
			cook_time: '25 min',
			description: 'En krämig och god kyckling Alfredo med pasta och parmesan.',
			img_url: 'image4.jpg',
			servings: 3,
			course_id: 3,
			instructions:
				'["Halvera kycklingfiléerna till 4 tunna filéer.","Vänd i mjölet, salta och peppra.","Finhacka schalottenlök och vitlök.","Fräs mjukt i en stekpanna på medelhög värme tills löken blir mjuk och glansig.","Tillsätt färskost, grädde och kycklingfond. Låt puttra ihop.","Stek kycklingen gyllene i smör.","Vänd ned riven parmesan i såsen.","Skär kycklingen i snygga skivor.","Blanda pastan med såsen och lägg kycklingen ovanpå vid servering.","Toppa med finhackad färsk persilja."]',
			ingredients:
				'["400 g tagliatelle", "2 kycklingfiléer", "0,5 dl vetemjöl","1 schalottenlök"," 2 klyftor vitlök", "2 msk smör, att steka löken i","100 g färskost", "3 dl vispgrädde (eller matlagningsgrädde)","1,5-2 msk koncentrerad kycklingfond","1 dl parmesanost, riven", "salt", "svartpeppar"]',
		};
		cy.request('POST', 'http://localhost:3000/api/new-recipe2', newRecipe).then(
			(response) => {
				expect(response.status).to.eq(201);
			}
		);
		cy.request('GET', 'http://localhost:3000/api/recipes').then((response) => {
			const recipes = response.body;
			cy.log('Recived recipes:', recipes);
		});
	});
});

// it('Check if it is possible to delete a recipe', function () {
// 	cy.visit('/');
// 	cy.wait(1000); // Vänta på get-anropet
// 	// cy.contains('Buillabaise');
// 	cy.contains('Remove') // Hitta alla knappar med texten 'Remove'
// 		.last() // Välj den sista "Remove"-knappen
// 		.click();
// 	cy.wait(500);
// 	cy.contains('Continue').click();
// });
