import { createContext } from 'react';

type ContextType = {
	newRecipe: string;
	setNewRecipe: (newRecipe: string) => void;
};

const defaultContextValue: ContextType = {
	newRecipe: '',
	setNewRecipe: () => {},
};

const Context = createContext<ContextType>(defaultContextValue);

export default Context;
