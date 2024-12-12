import {
	When,
	Then,
	Given,
	Before,
} from '@badeball/cypress-cucumber-preprocessor';


Before(() => {
	cy.visit('http://localhost:4000/');
});

Given(
	'Jag är på hemsidan och ett recept-kort med namnet Bouillabaisse finns.',
	() => {
		cy.contains('Bouillabaisse').should('be.visible');
	}
);

When('Jag klickar på kortet med namnet Bouillabaisse', () => {
	cy.contains('Bouillabaisse').click();
});

Then('En ny sida läses in som visar hela receptet, bla ingredienser', () => {
	cy.get()
});
