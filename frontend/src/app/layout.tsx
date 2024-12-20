import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import RecipeProvider from '@/RecipeProvider';
import HeaderMenu from '@/components/HeaderMenu';

export const metadata: Metadata = {
	title: 'Recipes app',
	description: 'Annas amazing recipes',
};

const sugarMagic = localFont({
	src: '../assets/font/SugarMagic.ttf',
	variable: '--sugar-magic',
	weight: ' 200, 400, 600',
});

// const avant = localFont({
// 	src: '../assets/font/avantgarde/AVGARDD_2.ttf',
// 	variable: '--avant',
// 	weight: ' 200, 400, 600',
// });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			></meta>
			<body className={`${sugarMagic.variable} antialiased`}>
				<RecipeProvider>
					<HeaderMenu />
					<main className="">{children}</main>
				</RecipeProvider>
			</body>
		</html>
	);
}
