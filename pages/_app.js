import Head from 'next/head';
import '../styles/globals.css';
import CurrentStepProvider from '../context/currentStepProvider';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';

function MyApp({ Component, pageProps }) {
	const theme = createTheme({
		typography: {
			allVariants: {
				fontFamily: "'Quicksand', 'serif'",
				// backgroundColor: 'rgb(240, 248, 255, 0.8)',
			},
		},
		// palette: {
		// 	background: {
		// 		default: 'rgb(240, 248, 255, 0.8)',
		// 	},
		// },
	});

	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				{/* <link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin /> */}
				{/* <link
					href='https://fonts.googleapis.com/css2?family=Linden+Hill:ital@1&display=swap'
					rel='stylesheet'
				/> */}
				{/* <meta
					name='viewport'
					content='initial-scale=1, maximum-scale=1, user-
  scalable=yes'
				/> */}
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
