import Head from 'next/head';
import '../styles/globals.css';
import CurrentStepProvider from '../context/currentStepProvider';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>
			<CurrentStepProvider>
				<Component {...pageProps} />
			</CurrentStepProvider>
		</>
	);
}

export default MyApp;
