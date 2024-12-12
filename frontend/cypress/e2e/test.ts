//
import {
	When,
	Then,
	Given,
	Before,
} from '@badeball/cypress-cucumber-preprocessor';

// Before(() => {
// 	cy.visit('http://localhost:4000/');
// });

// Given(
// 	'Jag är på hemsidan och ett recept-kort med namnet Bouillabaisse finns',
// 	() => {
// 		// cy.get('RecipeCard').should();
// 		// cy.contains('Bouillabaisse').should('be.visible');
// 	}
// );
// Given(
// 	'Jag är på hemsidan och ett recept-kort med namnet Bouillabaisse finns',
// 	() => {
// 		// Vänta på att sidan ska ha laddat och kontrollera om receptkortet med namnet "Bouillabaisse" finns
// 		cy.visit('http://localhost:4000'); // Om du inte redan är på rätt sida
// 		cy.intercept('GET', '/api/recipes').as('getRecipes');
// 		cy.wait('@getRecipes'); // Vänta på att API-anropet har slutförts
// 		cy.contains('Bouillabaisse').should('be.visible');
// 	}
// );
Given(
	'Jag är på hemsidan och ett receptkort med namnet Bouillabaisse finns',
	() => {
		// Gå till startsidan (ersätt URL om det behövs)
		cy.visit('http://localhost:4000');

		// Vänta på att receptkortet med namnet Bouillabaisse ska visas
		cy.contains('Bouillabaisse').should('be.visible');
	}
);

When('Jag klickar på kortet med namnet Bouillabaisse', () => {
	// Hitta och klicka på kortet som innehåller texten "Bouillabaisse"
	cy.contains('Bouillabaisse').click();
});

// When(
// 	'Jag klickar på kortet med namnet Bouillabaisse och skickas till en ny sida',
// 	() => {
// 		cy.contains('Bouillabaisse').click();
// 	}
// );

Then(
	'En ny sida läses in som visar hela receptet, bla titel och ingredienser',
	() => {
		cy.get('pageTitle').should('have.text', 'Bouillabaisse');
	}
);
