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

			// om nuvarande scroll position i y led är större än den senaste plus 10 pixlar så försvinner headern on scroll.
			if (isScrollingDown) {
				setIsHidden(true);
			} else if (isScrollingUp || currentScrollPos === 0) {
				setIsHidden(false);
			}

			setLastScrollTop(currentScrollPos);

			// När scroll i y-led är mer än 10 pixlar så får headern ett bakgrundsfilter
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
					<section className="flex-grow font-magic text-4xl md:text-[3rem] lg:text-[3.6rem] ">
						<Link rel="stylesheet" href="/">
							<b>Annas Recept</b>
						</Link>
					</section>
					<section className=" text-lg gap-7 sm:flex hidden justify-end items-center uppercase font-avant  ">
						<Link
							href="/addRecipe"
							className="underline-offset-4 hover:underline"
						>
							Skapa recept
						</Link>
						<Link
							href="/favorites"
							className="underline-offset-4 hover:underline"
						>
							Favoriter
						</Link>
						<Link href="/login" className="underline-offset-4 hover:underline">
							Login
						</Link>
					</section>
				</nav>
			</section>
		</section>
	);
}
export default HeaderMenu;
