import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import RecipeProvider from '@/RecipeProvider';
import HeaderMenu from '@/components/HeaderMenu';
// ../assets/font/AvenirNext-Medium.ttf
const avenirNext = localFont({
	src: '../assets/font/AvenirNext-Medium.ttf',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const avenirThin = localFont({
	src: '../assets/font/AvenirNext-thin.ttf',
	variable: '--font-geist-mono',
	weight: '100 900',
});

const sugarMagic = localFont({
	src: '../assets/font/SugarMagic.ttf',
	variable: '--sugar-magic',
	weight: ' 200, 400, 600',
});

const avant = localFont({
	src: '../assets/font/avantgarde/AVGARDD_2.ttf',
	variable: '--avant',
	weight: ' 200, 400, 600',
});

export const metadata: Metadata = {
	title: 'Recipes app',
	description: 'Annas amazing recipes',
};

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
			<RecipeProvider>
				<body
					className={`${avenirNext.variable} ${avenirThin.variable} ${sugarMagic.variable} ${avant.variable} antialiased`}
				>
					<HeaderMenu />
					<main className="">{children}</main>
				</body>
			</RecipeProvider>
		</html>
	);
}
