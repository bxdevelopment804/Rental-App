import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Typography, Grid, Box, Button } from '@mui/material';

export default function Home() {
	return (
		<div>
			<Head>
				<title>Fair Oak Farms Rental Application</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main id='homePageContainer'>
				<Box>
					<Image
						id='backgroundImage'
						src='https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1600'
						layout='fill'
					/>
				</Box>
				<Box
					sx={{
						flexGrow: 1,
					}}
					id='heroTextContainer'
				>
					<Grid container>
						<Grid item xs={12} md={12}>
							<Typography
								variant='h2'
								align='center'
								className='heroText'
								id='heroTitle'
							>
								Welcome to Fair Oak Farm Rentals!
							</Typography>
						</Grid>
						<Grid item xs={12} md={12}>
							<Typography
								variant='h4'
								align='center'
								className='heroText'
								id='heroSubText'
							>
								Please click below if you would like to apply for one of our
								properties!
							</Typography>
							<Link href='/rentalApplication'>
								<Box id='applyButtonContainer'>
									<Button id='applyButton' variant='contained'>
										Apply Here!
									</Button>
								</Box>
							</Link>
						</Grid>
					</Grid>
				</Box>
				<Box id='homePageFooter'>
					<Typography variant='subtitle2'>
						Created by{' '}
						<strong>
							<i>BX Development</i>
						</strong>
					</Typography>
				</Box>
			</main>
		</div>
	);
}
