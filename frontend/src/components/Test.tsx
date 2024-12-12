import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Test() {
	const [content, setContent] = useState<string>('');
	const [instructions, setInstructions] = useState<string[]>([]);

	// När användaren trycker på "Spara", delas innehållet i array
	const handleSave = () => {
		// Extrahera textinnehållet från Quill som HTML
		const parsedInstructions = content
			.split('</p>') // Dela upp vid varje slut på ett stycke
			.map((line) => line.replace(/<[^>]+>/g, '').trim()) // Ta bort HTML-taggar och trimma whitespace
			.filter((line) => line); // Ta bort tomma strängar

		setInstructions(parsedInstructions);
		console.log('Saved Instructions:', parsedInstructions);
	};

	return (
		<div className="instructions-editor">
			<h3>Instruktioner:</h3>
			<ReactQuill
				value={content}
				onChange={setContent}
				theme="snow"
				placeholder="Skriv dina instruktioner här..."
			/>
			<button
				onClick={handleSave}
				className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
			>
				Spara instruktioner
			</button>

			{instructions.length > 0 && (
				<div className="saved-instructions mt-4">
					<h4>Sparade instruktioner:</h4>
					<ol>
						{instructions.map((instruction, index) => (
							<li key={index}>{instruction}</li>
						))}
					</ol>
				</div>
			)}
		</div>
	);
}
