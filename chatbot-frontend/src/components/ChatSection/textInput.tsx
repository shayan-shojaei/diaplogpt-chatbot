import React, { ChangeEvent, useState } from 'react';
import styles from '../../styles/chatSection.module.scss';

export default function TextInput(props: {
	loading: boolean;
	onSubmit: (text: string) => void;
}) {
	const [inputText, setInputText] = useState('');

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputText(e.target.value);
	};

	const handleSubmit = (
		e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		if (inputEmpty || props.loading) return;

		props.onSubmit(inputText);
		setInputText('');
	};

	const inputEmpty = inputText.trim().length === 0;

	return (
		<form className={styles.textInput} onSubmit={handleSubmit}>
			<input
				placeholder="Message..."
				value={inputText}
				onChange={handleInputChange}
			/>
			<button onClick={handleSubmit} disabled={inputEmpty || props.loading}>
				Send
			</button>
		</form>
	);
}
