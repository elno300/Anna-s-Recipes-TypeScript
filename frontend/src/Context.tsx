import { createContext } from 'react';

type ContextType = {
	newRecipe: string;
	setNewRecipe: (newRecipe: string) => void;
};

const defaultContextValue: ContextType = {
	newRecipe: '',
	setNewRecipe: () => {},
};

// interface ContextType {
// 	setNewRecipe: (title: string) => void;
// 	userId: string | number | null;
// }

const Context = createContext<ContextType>(defaultContextValue);

export default Context;
