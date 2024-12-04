'use client';
import styles from '@/components/HeaderMenu.module.css';
import { useEffect, useState } from 'react';
import classnames from 'classnames';
import Link from 'next/link';

function HeaderMenu() {
	const [lastScrollTop, setLastScrollTop] = useState(0);
	const [isScrolled, setIsScrolled] = useState(false);
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

	return (
		<section
			className={classnames(
				styles.header,
				isScrolled && styles.transparentWindow,
				isHidden && styles.hidden
			)}
		>
			<section className={styles.navbarWrapper}>
				<nav className="flex">
					<section className="flex-grow font-magic">
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
