import '../styles/globals.css';
import CurrentStepProvider from '../context/currentStepProvider';

function MyApp({ Component, pageProps }) {
	return (
		<CurrentStepProvider>
			<Component {...pageProps} />
		</CurrentStepProvider>
	);
}

export default MyApp;
