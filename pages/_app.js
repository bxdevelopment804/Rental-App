import Head from 'next/head';
import '../styles/globals.css';
import CurrentStepProvider from '../context/currentStepProvider';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				{/* <meta
					name='viewport'
					content='initial-scale=1, maximum-scale=1, user-
  scalable=yes'
				/> */}
			</Head>
			<CurrentStepProvider>
				<Component {...pageProps} />
			</CurrentStepProvider>
		</>
	);
}

export default MyApp;
