'use client';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useContext } from 'react';
import Context from '@/Context';

interface IdProp {
	id: number;
}

export default function RemoveButton({ id }: IdProp) {
	const context = useContext(Context);
	const { setNewRecipe } = context;

	function removeRecipe() {
		fetch(`http://localhost:3000/api/delete-recipe/${id}`, {
			method: 'DELETE',
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data.message);
				setNewRecipe(`deleted${id}`);
			});
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger className="bottom-0 right-0 z-10 bg-slate-500">
				Remove
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Är du helt säker?</AlertDialogTitle>
					<AlertDialogDescription>
						Om du tar bort ett recept så går det inte att ångra sig. Detta
						kommer permanent radera receptet.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction className="cursor-pointer" onClick={removeRecipe}>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
