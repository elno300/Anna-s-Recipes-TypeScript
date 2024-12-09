import image1 from '../assets/images/bg-image2.webp';
import Image from 'next/image';

function HeroModule() {
	return (
		<>
			<section
				className={`h-[90vh] md:h-[calc(100vh-50px)] w-screen overflow-hidden top-0 m-0 bg-slate-500`}
			>
				<Image
					className="h-full lg:h-auto cover md:w-full w-auto object-cover"
					src={image1}
					alt="Picture of the author"
					priority
				></Image>
			</section>
		</>
	);
}
export default HeroModule;
