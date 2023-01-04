import React from 'react';
import styles from '../../styles/chatSection.module.scss';

function UserBubble(props: { text: string }) {
	return <div className={styles.userBubble}>{props.text}</div>;
}

function BotBubble(props: { text: string }) {
	return <div className={styles.botBubble}>{props.text}</div>;
}

export default function Messages(props: { data: string[] }) {
	return (
		<div className={styles.messages}>
			{props.data
				.map((message, index) =>
					index % 2 === 0 ? (
						<UserBubble key={index} text={message} />
					) : (
						<BotBubble key={index} text={message} />
					)
				)
				.reverse()}
		</div>
	);
}
