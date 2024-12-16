//
import {
	When,
	Then,
	Given,
	Before,
} from '@badeball/cypress-cucumber-preprocessor';

Before(() => {
	cy.visit('/');
});

Given(
	'Jag är på hemsidan och ett receptkort med namnet Bouillabaisse finns',
	() => {
		cy.contains('Bouillabaisse').should('be.visible');
	}
);

When('Jag klickar på kortet med namnet Bouillabaisse', () => {
	cy.contains('Bouillabaisse').click();
});

Then('Ska jag befinna mig på rätt URL för recpetet', () => {
	cy.url().should('eq', 'http://localhost:4000/RecipePage/Bouillabaisse');
});

Then('Sidan ska visa namnet på receptet', () => {
	cy.contains('Bouillabaisse').should('be.visible');
});
