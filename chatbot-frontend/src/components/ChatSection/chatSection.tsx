import React, { useEffect, useState } from 'react';
import { useAxiosPost } from '../../hooks/http';
import styles from '../../styles/chatSection.module.scss';
import Messages from './messages';
import TextInput from './textInput';

export default function ChatSection() {
	const [messages, setMessages] = useState<string[]>([]);
	const { post, data, loading } = useAxiosPost(process.env.REACT_APP_API ?? '');

	const handleSubmit = (text: string) => {
		setMessages((p) => {
			const newMessages = [...p, text];
			post(newMessages);
			return newMessages;
		});
	};

	useEffect(() => {
		if (data && Array.isArray(data.full)) {
			setMessages(data.full);
		}
	}, [data]);

	return (
		<div className={styles.wrapper}>
			<Messages data={messages} />
			<TextInput loading={loading} onSubmit={handleSubmit} />
		</div>
	);
}
