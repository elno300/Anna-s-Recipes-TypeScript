'use client';

import 'react-quill/dist/quill.snow.css';
import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';

// https://medium.com/@shubhritik/how-to-use-react-quill-with-images-in-nextjs-699494b1d951
// Wysiwyg

type TextEditorProps = {
	id: string;
	placeholder: string;
	onChange: (value: string) => void;
};

const TextEditor: React.FC<TextEditorProps> = ({
	onChange,
	id,
	placeholder = 'Skriv en',

}) => {
	const [value, setValue] = useState<string>('');

	const modules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			[{ list: 'ordered' }, { list: 'bullet' }],
		],
	};

	const handleEditorChange = (newValue: string) => {
		setValue(newValue);
		onChange(value);
	};

	return (
		<ReactQuill
			value={value}
			modules={modules}
			onChange={handleEditorChange}
			id={id}
			theme="snow"
			placeholder={placeholder}
		/>
	);
};

export default TextEditor;
