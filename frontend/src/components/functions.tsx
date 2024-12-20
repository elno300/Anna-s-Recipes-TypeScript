import imageCompression from 'browser-image-compression';

export const compressFileSize = async (img: File) => {
	console.log('originalFile instanceof Blob', img instanceof Blob); // true
	console.log(`originalFile size ${img.size / 1024 / 1024} MB`);

	const options = {
		maxSizeMB: 1,
		maxWidthOrHeight: 1920,
		useWebWorker: true,
	};

	try {
		const compressedFile = await imageCompression(img, options);
		console.log(
			'compressedFile instanceof Blob',
			compressedFile instanceof Blob
		); // true
		console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
		return compressedFile;
	} catch (error) {
		console.log(error, 'Det gick inte att omvandla bilden');
	}
};

// export const handleInstructionsOrIngredientsChange = (
// 	event: React.ChangeEvent<HTMLTextAreaElement>
// ) => {
// 	const value = event.target.value;

// 	// Dela upp instruktionerna i rader och numrera dem
// 	const splitInstructions = event.target.value
// 		.split('\n')
// 		.map((line, index) => `${index + 1}. ${line.trim()}`)
// 		.filter((line) => line !== ''); // Ta bort tomma rader

// 	return { value, splitInstructions };
// };
