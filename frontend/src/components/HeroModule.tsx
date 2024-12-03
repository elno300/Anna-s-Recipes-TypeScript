import image1 from '../assets/images/bg-image2.jpg';
import Image from 'next/image';

function HeroModule() {
	return (
		<>
			<section
				className={`h-[calc(100vh-150px)] w-screen overflow-hidden top-0 m-0`}
			>
				<Image
					className="cover w-full"
					src={image1}
					alt="Picture of the author"
				></Image>
			</section>
		</>
	);
}
export default HeroModule;
