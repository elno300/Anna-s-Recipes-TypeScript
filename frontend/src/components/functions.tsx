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
