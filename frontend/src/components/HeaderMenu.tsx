'use client';
import styles from '@/components/HeaderMenu.module.css';
import { useEffect, useState } from 'react';
import classnames from 'classnames';
import Link from 'next/link';
// import localFont from 'next/font/local';
// import avant from '../assets/font/avantgarde/AVGARDD_2';
// import { useNavigate } from 'react-router-dom';
// npm install react-router-dom

// import RecipeForm from './RecipeForm';

function HeaderMenu() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [lastScrollTop, setLastScrollTop] = useState(0);
	// const [currentScrollPos, setCurrentScrollPos] = useState(window.scrollY);
	const [isHidden, setIsHidden] = useState(false);
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPos = window.scrollY;
			const isScrollingDown = currentScrollPos > lastScrollTop + 10;
			const isScrollingUp = currentScrollPos < lastScrollTop - 3;

			if (isScrollingDown) {
				setIsHidden(true);
			} else if (isScrollingUp || currentScrollPos === 0) {
				setIsHidden(false);
			}

			setLastScrollTop(currentScrollPos);

			if (window.scrollY > 10) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [lastScrollTop]);

	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		const currentScrollPos = window.scrollY;
	// 		console.log('currentScrollPos :>> ', currentScrollPos);
	// 		if (window.scrollY > 10) {
	// 			setIsScrolled(true);
	// 		} else {
	// 			setIsScrolled(false);
	// 		}

	// 		if (currentScrollPos > lastScrollTop + 10) {
	// 			setIsHidden(true);
	// 		} else if (currentScrollPos < lastScrollTop - 3) {
	// 			setIsHidden(false);
	// 		} else if (currentScrollPos === 0) {
	// 			setIsHidden(false);
	// 		}

	// 		setLastScrollTop(currentScrollPos);
	// 	};
	// 	window.addEventListener('scroll', handleScroll);
	// 	console.log(isScrolled);
	// 	return () => {
	// 		window.removeEventListener('scroll', handleScroll);
	// 	};
	// }, [lastScrollTop]);

	// const isHiddenAndScrolled = isHidden && isScrolled;

	return (
		<section
			className={classnames(
				styles.header,
				// isHiddenAndScrolled && styles.hiddenAndTransparent,
				// isScrolled && styles.transparentWindow,
				isScrolled && styles.transparentWindow,
				isHidden && styles.hidden
				// isHidden ? styles.hidden : isScrolled && styles.transparentWindow
			)}
		>
			<section className={styles.navbarWrapper}>
				<nav className="flex">
					<section className="flex-grow avantgarde">
						<Link rel="stylesheet" href="/">
							<b>Annas Recept</b>
						</Link>
					</section>
					<section className=" text-lg w-5/12 flex gap-7 justify-end items-center">
						<Link href="/addRecipe">Skapa recept</Link>
						<Link href="/favorites">Favoriter</Link>
						<Link href="/login">Login</Link>
					</section>
				</nav>
			</section>
		</section>
	);
}
export default HeaderMenu;
