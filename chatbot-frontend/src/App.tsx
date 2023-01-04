import React from 'react';
import ChatSection from './components/ChatSection/chatSection';
import Footer from './components/Footer/footer';
import styles from './styles/main.module.scss';

function App() {
	return (
		<div className={styles.main}>
			<ChatSection />
			<Footer />
		</div>
	);
}

export default App;
