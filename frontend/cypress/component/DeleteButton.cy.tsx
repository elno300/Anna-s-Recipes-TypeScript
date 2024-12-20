// import RemoveButton from '../../src/components/RemoveButton';
// // import { useContext } from 'react';
// // import Context from '../../src/Context';

// describe('<RemoveButton/>', () => {
// 	it('Button click should delete a recipe', () => {
// 		cy.intercept(
// 			{
// 				method: 'DELETE',
// 				url: 'http://localhost:3000/api/delete-recipe/4',
// 			},
// 			{
// 				body: {
// 					meassage: 'Recpetet med idt 4 är raderat',
// 				},
// 			}
// 		).as('delete-recipe');

// 		cy.mount(<RemoveButton id={4} />);

// 		cy.wait('@delete-recipe');
// 		cy.get('[data-testid="confirmation-message"]').should(
// 			'contain',
// 			'Recpetet med idt 4 är raderat'
// 		);
// 	});
// });
