// import RemoveButton from '@/components/RemoveButton';
import RemoveButton from '../../src/components/RemoveButton';

describe('<RemoveButton/>', () => {
	it('deletes a recipe', () => {
		cy.intercept(
			{
				method: 'DELETE',
				url: 'http://localhost:3000/api/delete-recipe/4',
			},
			{
				body: {
					meassage: 'Recpetet med idt 4 är raderat',
				},
			}
		).as('delete-recipe');

		cy.mount(<RemoveButton id={4} />);
	});
});
