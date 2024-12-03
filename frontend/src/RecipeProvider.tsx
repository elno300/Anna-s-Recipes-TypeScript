'use client';
import { useState } from 'react';
import { ReactNode } from 'react';
import Context from './Context';

interface ProviderProps {
	children: ReactNode;
}

export default function RecipeProvider({ children }: ProviderProps) {
	const [newRecipe, setNewRecipe] = useState<string>('empty');

	const value = {
		newRecipe,
		setNewRecipe,
	};

	return <Context.Provider value={value}>{children}</Context.Provider>;
}
