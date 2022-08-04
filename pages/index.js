import Head from 'next/head';
import Link from 'next/link';
import { Typography, Grid, Box, Button } from '@mui/material';
// import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		// <div className={styles.container}>
		<div>
			<Head>
				<title>Fair Oak Farms Rental Application</title>
				{/* <meta name='description' content='Generated by create next app' /> */}
				{/* <meta name='viewport' content='width=device-width, initial-scale=1.0' /> */}
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{/* <RentalApplication /> */}
			<main>
				<Typography variant='h2' align='center'>
					Welcome to the Fair Oak Farms Rental Application!
				</Typography>
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={12}>
							<Typography variant='h4' align='center'>
								Please click below if you would like to apply for one of our
								properties!
							</Typography>
						</Grid>
						<Grid id='applyButtonContainer' item xs={12} md={12}>
							<Link href='/rentalApplication'>
								<Button variant='contained'>Apply Here!</Button>
							</Link>
						</Grid>
					</Grid>
				</Box>
			</main>
			{/* <PersonalInformation /> */}
			{/* <RentalInfo2 /> */}

			{/* <main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href='https://nextjs.org'>Next.js!</a>
				</h1>

				<p className={styles.description}>
					Get started by editing{' '}
					<code className={styles.code}>pages/index.js</code>
				</p>

				<div className={styles.grid}>
					<a href='https://nextjs.org/docs' className={styles.card}>
						<h2>Documentation &rarr;</h2>
						<p>Find in-depth information about Next.js features and API.</p>
					</a>

					<a href='https://nextjs.org/learn' className={styles.card}>
						<h2>Learn &rarr;</h2>
						<p>Learn about Next.js in an interactive course with quizzes!</p>
					</a>

					<a
						href='https://github.com/vercel/next.js/tree/canary/examples'
						className={styles.card}
					>
						<h2>Examples &rarr;</h2>
						<p>Discover and deploy boilerplate example Next.js projects.</p>
					</a>

					<a
						href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
						className={styles.card}
					>
						<h2>Deploy &rarr;</h2>
						<p>
							Instantly deploy your Next.js site to a public URL with Vercel.
						</p>
					</a>
				</div>
			</main> */}

			{/* <footer className={styles.footer}>
				<a
					href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
					target='_blank'
					rel='noopener noreferrer'
				>
					Powered by{' '}
					<span className={styles.logo}>
						<Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
					</span>
				</a>
			</footer> */}
			<footer>
				<Typography variant='subtitle2'>
					Created by{' '}
					<strong>
						<i>BX Development</i>
					</strong>
				</Typography>
			</footer>
		</div>
	);
}
