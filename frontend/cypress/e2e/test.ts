import {
	When,
	Then,
	Given,
	Before,
} from '@badeball/cypress-cucumber-preprocessor';

Before(() => {
	cy.visit('http://localhost:4000/');
});

//Hur funkar denna?
Given(
	'Jag är på hemsidan och knappen har texten Lägg till nytt recept',
	() => {}
);

Given('Jag är på hemsidan och knappen visar ett fromulär', () => {
	cy.contains('Lägg till nytt recept').click(); // Click on first el containing 'Lägg till nytt recept'
});

When('Jag klickat på knappen bör ett formulär synas', () => {
	cy.get('form').should('be.visible');
});

When('Jag klickar på knappen', () => {
	cy.contains('Lägg till nytt recept').click();
});

Then('Man kan skriva in en text i inputfältet för titel', () => {
	cy.get('#title').type('Spagetti med köttfärsås');
});

// Then('Knappen ska visa 2', () => {
// 	cy.get('button').should('have.text', 'count is 2');
// });

// cy.contains('Lägg till nytt recept').click();

// cy.get('form').should('be.visible');
// cy.get('#title').type('Spagetti med köttfärsås');
// cy.get('#cookTime').type('30');
// cy.get('#category').select('Pasta');
// cy.get('#servings').select('3');
// cy.get('#description').type(
// 	'Favoritmat nummer ett! Alla - oavsett ålder - älskar spaghetti och köttfärssås! Här är ett smakfullt och pålitligt recept som du lyckas med. Servera gärna med riven parmesanost.'
// );
// cy.get('button[type="submit"]').click();
