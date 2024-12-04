import RecipeForm from '@/components/RecipeForm';
// import Image from 'next/image';
// import image1 from '../../assets/images/bg-image3.jpg';

export default function addRecipe() {
	return (
		<>
			{/* <Image
				className="cover w-full -z-1 absolute"
				src={image1}
				alt="Picture of the author"
			></Image> */}
			<section className="w-screen max-w-1440 min-h-svh justify-center pt-36 flex z-1 relative">
				<RecipeForm />
			</section>
		</>
	);
}
