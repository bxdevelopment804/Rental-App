import Head from 'next/head';
import '../styles/globals.css';
import CurrentStepProvider from '../context/currentStepProvider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function MyApp({ Component, pageProps }) {
	const theme = createTheme({
		typography: {
			allVariants: {
				fontFamily: "'Quicksand', 'serif'",
			},
		},
	});

	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>
			<ThemeProvider theme={theme}>
				<CurrentStepProvider>
					<Component {...pageProps} />
				</CurrentStepProvider>
			</ThemeProvider>
		</>
	);
}

export default MyApp;
