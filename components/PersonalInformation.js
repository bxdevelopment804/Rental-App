import React, { useState, useReducer, useRef } from 'react';

import { useFormik, withFormik, Formik, getIn, FastField, Form } from 'formik';

import * as Yup from 'yup';
import {
	Alert,
	TextField,
	Button,
	Radio,
	RadioGroup,
	FormLabel,
	FormControlLabel,
	Box,
	Grid,
	Snackbar,
	InputAdornment,
} from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import emailjs from '@emailjs/browser';

const PersonalInformation = () => {
	//Submitted form confirmation functions
	const [toastOpen, setToastOpen] = useState(false);

	const handleClick = () => {
		setToastOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setToastOpen(false);
	};

	function handleSubmit() {
		<Alert severity='success'>This is a success alert — check it out!</Alert>;
	}

	//EmailJs related functions
	const form = useRef();
	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				process.env.NEXT_PUBLIC_SERVICE_ID,
				process.env.NEXT_PUBLIC_TEMPLATE_ID,
				form.current,
				process.env.NEXT_PUBLIC_API_KEY
			)
			.then(
				(result) => {
					console.log(result.text);
				},
				(error) => {
					console.log(error.text);
				}
			);

		// updateState(applicantObject);

		handleClick();
	};

	//Testing the current state values.  FOR TESTING ONLY - DELETE LATER
	function logApplicantObject() {
		console.log('Applicant Object');
		console.table(state);
		// console.dir(state);
	}

	const validationSchema = Yup.object({
		applicantName: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		applicantPhone: Yup.string()
			.max(10, 'Must be 10 characters or less.  No symbols needed.')
			.required('Required'),
		applicantDOB: Yup.date()
			// .default(() => new Date())
			.required('Required'),
		applicantEmail: Yup.string()
			.email('Invalid email address')
			.required('Required'),
		currentAddress: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		currentCity: Yup.string()
			.max(20, 'Must be 20 characters or less')
			.required('Required'),
		currentState: Yup.string()
			.max(2, 'Enter two letter state abbreviation.')
			// .oneOf([
			// 	'AL',
			// 	'AK',
			// 	'AZ',
			// 	'AR',
			// 	'CA',
			// 	'CO',
			// 	'CT',
			// 	'DE',
			// 	'DC',
			// 	'FL',
			// 	'GA',
			// 	'HI',
			// 	'ID',
			// 	'IL',
			// 	'IN',
			// 	'IA',
			// 	'KS',
			// 	'KY',
			// 	'LA',
			// 	'ME',
			// 	'MD',
			// 	'MA',
			// 	'MI',
			// 	'MN',
			// 	'MS',
			// 	'MO',
			// 	'MT',
			// 	'NE',
			// 	'NV',
			// 	'NH',
			// 	'NJ',
			// 	'NM',
			// 	'NY',
			// 	'NC',
			// 	'ND',
			// 	'OH',
			// 	'OK',
			// 	'OR',
			// 	'PA',
			// 	'RI',
			// 	'SC',
			// 	'SD',
			// 	'TN',
			// 	'TX',
			// 	'UT',
			// 	'VT',
			// 	'VA',
			// 	'WA',
			// 	'WV',
			// 	'WI',
			// 	'WY',
			// ])
			.required('Required'),
		currentZip: Yup.string()
			.max(5, 'Must be 5 characters')
			.required('Required'),
		currentLandlord: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		currentLandlordPhone: Yup.string()
			.max(10, 'Must be 10 characters.  No symbols needed.')
			.required('Required'),
		currentTenure: Yup.string()
			.max(2, 'Enter how many years you lived at this address.')
			.required('Required'),
		currentReason: Yup.string()
			.max(50, 'Response must be 50 characters or less')
			.required('Required'),
		previousAddress: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		previousCity: Yup.string()
			.max(20, 'Must be 20 characters or less')
			.required('Required'),
		previousState: Yup.string()
			.max(2, 'Enter two letter state abbreviation.')
			// .oneOf([
			// 	'AL',
			// 	'AK',
			// 	'AZ',
			// 	'AR',
			// 	'CA',
			// 	'CO',
			// 	'CT',
			// 	'DE',
			// 	'DC',
			// 	'FL',
			// 	'GA',
			// 	'HI',
			// 	'ID',
			// 	'IL',
			// 	'IN',
			// 	'IA',
			// 	'KS',
			// 	'KY',
			// 	'LA',
			// 	'ME',
			// 	'MD',
			// 	'MA',
			// 	'MI',
			// 	'MN',
			// 	'MS',
			// 	'MO',
			// 	'MT',
			// 	'NE',
			// 	'NV',
			// 	'NH',
			// 	'NJ',
			// 	'NM',
			// 	'NY',
			// 	'NC',
			// 	'ND',
			// 	'OH',
			// 	'OK',
			// 	'OR',
			// 	'PA',
			// 	'RI',
			// 	'SC',
			// 	'SD',
			// 	'TN',
			// 	'TX',
			// 	'UT',
			// 	'VT',
			// 	'VA',
			// 	'WA',
			// 	'WV',
			// 	'WI',
			// 	'WY',
			// ])
			.required('Required'),
		previousZip: Yup.string()
			.max(5, 'Must be 5 characters')
			.required('Required'),
		previousLandlord: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		previousLandlordPhone: Yup.string()
			.max(10, 'Must be 10 characters.  No symbols needed.')
			.required('Required'),
		previousTenure: Yup.string()
			.max(2, 'Enter how many years you lived at this address.')
			.required('Required'),
		previousReason: Yup.string()
			.max(50, 'Response must be 50 characters or less')
			.required('Required'),
		presentEmployer: Yup.string()
			.max(35, 'Response must be 35 characters or less')
			.required('Required'),
		position: Yup.string()
			.max(35, 'Response must be 35 characters or less')
			.required('Required'),
		monthlyIncome: Yup.string()
			.max(7, 'Response must be 7 characters or less')
			.required('Required'),
		employerPhone: Yup.string()
			.max(10, 'Must be 10 characters or less.  No symbols needed.')
			.required('Required'),
		employerTenure: Yup.string()
			.max(2, 'Enter how many years you worked for this employer.')
			.required('Required'),
		otherIncome: Yup.string()
			.max(7, 'Response must be 7 characters or less')
			.required('Required'),
		employerAddress: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		employerCity: Yup.string()
			.max(20, 'Must be 20 characters or less')
			.required('Required'),
		employerState: Yup.string()
			.max(2, 'Enter two letter state abbreviation.')
			// .oneOf([
			// 	'AL',
			// 	'AK',
			// 	'AZ',
			// 	'AR',
			// 	'CA',
			// 	'CO',
			// 	'CT',
			// 	'DE',
			// 	'DC',
			// 	'FL',
			// 	'GA',
			// 	'HI',
			// 	'ID',
			// 	'IL',
			// 	'IN',
			// 	'IA',
			// 	'KS',
			// 	'KY',
			// 	'LA',
			// 	'ME',
			// 	'MD',
			// 	'MA',
			// 	'MI',
			// 	'MN',
			// 	'MS',
			// 	'MO',
			// 	'MT',
			// 	'NE',
			// 	'NV',
			// 	'NH',
			// 	'NJ',
			// 	'NM',
			// 	'NY',
			// 	'NC',
			// 	'ND',
			// 	'OH',
			// 	'OK',
			// 	'OR',
			// 	'PA',
			// 	'RI',
			// 	'SC',
			// 	'SD',
			// 	'TN',
			// 	'TX',
			// 	'UT',
			// 	'VT',
			// 	'VA',
			// 	'WA',
			// 	'WV',
			// 	'WI',
			// 	'WY',
			// ])
			.required('Required'),
		evictionStatus: Yup.boolean().required('Required').oneOf([true, false]),
		depositMoney: Yup.string()
			.max(7, 'Response must be 7 characters or less')
			.required('Required'),
		firstReferenceName: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		firstReferenceTenure: Yup.string()
			.max(2, 'Enter how many years you worked for this employer.')
			.required('Required'),
		firstReferenceRelationship: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		firstReferencePhone: Yup.string()
			.max(10, 'Must be 10 characters or less.  No symbols needed.')
			.required('Required'),
		secondReferenceName: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		secondReferenceTenure: Yup.string()
			.max(2, 'Enter how many years you worked for this employer.')
			.required('Required'),
		secondReferenceRelationship: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		secondReferencePhone: Yup.string()
			.max(10, 'Must be 10 characters or less.  No symbols needed.')
			.required('Required'),
		thirdReferenceName: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		thirdReferenceTenure: Yup.string()
			.max(2, 'Enter how many years you worked for this employer.')
			.required('Required'),
		thirdReferenceRelationship: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		thirdReferencePhone: Yup.string()
			.max(10, 'Must be 10 characters or less.  No symbols needed.')
			.required('Required'),
		adultsNumber: Yup.string()
			.max(1, 'Must be one character')
			.required('Required'),
		childrenNumber: Yup.string()
			.max(1, 'Must be one character')
			.required('Required'),
		otherApplicants: Yup.string()
			.max(
				35,
				'Please enter the names of other applicants that need to be added to the lease.'
			)
			.required('Required'),
		signedBy: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		signatureDate: Yup.date()
			.default(() => new Date())
			.required('Required'),
	});

	const formik = useFormik({
		initialValues: {
			applicantName: '',
			applicantPhone: '',
			applicantDOB: '',
			applicantEmail: '',
			currentAddress: '',
			currentCity: '',
			currentState: '',
			currentZip: '',
			currentLandlord: '',
			currentLandlordPhone: '',
			currentTenure: '',
			currentReason: '',
			previousAddress: '',
			previousCity: '',
			previousState: '',
			previousZip: '',
			previousLandlord: '',
			previousLandlordPhone: '',
			previousTenure: '',
			previousReason: '',
			presentEmployer: '',
			position: '',
			monthlyIncome: '',
			employerPhone: '',
			employerTenure: '',
			otherIncome: '',
			employersAddress: '',
			employersCity: '',
			employersState: '',
			evictionStatus: false,
			depositMoney: '',
			firstReferenceName: '',
			firstReferenceTenure: '',
			firstReferenceRelationship: '',
			firstReferencePhone: '',
			secondReferenceName: '',
			secondReferenceTenure: '',
			secondReferenceRelationship: '',
			secondReferencePhone: '',
			thirdReferenceName: '',
			thirdReferenceTenure: '',
			thirdReferenceRelationship: '',
			thirdReferencePhone: '',
			adultsNumber: 1,
			childrenNumber: 0,
			otherApplicants: '',
			signedBy: '',
			signatureDate: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
			console.log(values);
		},
	});

	return (
		<div>
			<h1 id='pageHeader' className='formLine'>
				Personal Information
			</h1>

			{/* <form id='applicantForm' ref={form} onSubmit={sendEmail}> */}
			<form id='applicantForm' ref={form} onSubmit={formik.handleSubmit}>
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={2}>
						{/* <div className='formLine'> */}
						{/* <label htmlFor='applicantName'>Applicants Full Name</label> */}
						<Grid item xs={6} md={7}>
							<TextField
								fullWidth
								id='applicantName'
								name='applicantName'
								label='Applicant Name'
								// className='largeField'
								required
								value={formik.values.applicantName}
								onChange={formik.handleChange}
								// onBlur={formik.handleChange}
								error={
									formik.touched.applicantName &&
									Boolean(formik.errors.applicantName)
								}
								helperText={
									formik.touched.applicantName && formik.errors.applicantName
								}
								// variant='standard'
								// onInput={(event) =>
								// 	updateState({ applicantName: event.target.value })
								// }
							/>
						</Grid>
						<Grid item xs={6} md={5}>
							{/* <label htmlFor='applicantDOB'>DOB</label> */}
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								{/* <TextField
							id='applicantDOB'
							name='applicantDOB'
							label='Applicant Birth Date'
							required
							type='date'
							value={formik.values.applicantDOB}
							onChange={formik.handleChange}
							error={
								formik.touched.applicantDOB &&
								Boolean(formik.errors.applicantDOB)
							}
							helperText={
								formik.touched.applicantDOB && formik.errors.applicantDOB
							}
						/> */}
								<DatePicker
									fullWidth
									id='applicantDOB'
									name='applicantDOB'
									label='Applicant Birth Date'
									// className='smallField'
									// format='MM/dd/yyyy'
									inputFormat='MM/dd/yyyy'
									required
									value={formik.values.applicantDOB || null}
									// onChange={formik.handleChange}
									// onChange={(value) =>
									// 	formik.handleChange('values.applicantDOB', value)
									// }
									onChange={(value) => {
										console.log('___', value);
										formik.setFieldValue('applicantDOB', value);
									}}
									onBlur={formik.handleBlur}
									error={
										formik.touched.applicantDOB &&
										Boolean(formik.errors.applicantDOB)
									}
									helperText={
										formik.touched.applicantDOB && formik.errors.applicantDOB
									}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</Grid>
						{/* </div> */}

						{/* <div className='formLine'> */}
						{/* <label htmlFor='applicantPhone'>Phone #</label> */}
						<Grid item xs={6} md={6}>
							<TextField
								fullWidth
								id='applicantPhone'
								name='applicantPhone'
								label='Applicant Phone Number'
								// className='smallField'
								required
								value={formik.values.applicantPhone}
								onChange={formik.handleChange}
								// onBlur={formik.handleChange}
								error={
									formik.touched.applicantPhone &&
									Boolean(formik.errors.applicantPhone)
								}
								helperText={
									formik.touched.applicantPhone && formik.errors.applicantPhone
								}
								// variant='standard'
								// onInput={(event) =>
								// 	updateState({ applicantPhone: event.target.value })
								// }
							/>
						</Grid>
						<Grid item xs={6} md={6}>
							{/* <label htmlFor='applicantEmail'>Email</label> */}
							<TextField
								fullWidth
								id='applicantEmail'
								name='applicantEmail'
								label='Applicant Email'
								// className='largeField'
								required
								type='email'
								value={formik.values.applicantEmail}
								onChange={formik.handleChange}
								// onBlur={formik.handleChange}
								error={
									formik.touched.applicantEmail &&
									Boolean(formik.errors.applicantEmail)
								}
								helperText={
									formik.touched.applicantEmail && formik.errors.applicantEmail
								}
								// variant='standard'
								// onInput={(event) =>
								// 	updateState({ applicantEmail: event.target.value })
								// }
							/>
							{/* </div> */}
						</Grid>

						{/* <div className='formLine'> */}
						{/* <label htmlFor='currentAddress'>Current Address</label> */}
						<Grid item xs={6} md={5}>
							<TextField
								fullWidth
								id='currentAddress'
								name='currentAddress'
								label='Current Address'
								// className='largeField'
								required
								value={formik.values.currentAddress}
								onChange={formik.handleChange}
								// onBlur={formik.handleChange}
								error={
									formik.touched.currentAddress &&
									Boolean(formik.errors.currentAddress)
								}
								helperText={
									formik.touched.currentAddress && formik.errors.currentAddress
								}
								// variant='standard'
								// onInput={(event) =>
								// 	updateState({ currentAddress: event.target.value })
								// }
							/>
							{/* <label htmlFor='currentCity'>City</label> */}
						</Grid>
						<Grid item xs={6} md={3}>
							<TextField
								fullWidth
								id='currentCity'
								name='currentCity'
								label='City'
								// className='smallField'
								required
								value={formik.values.currentCity}
								onChange={formik.handleChange}
								// onBlur={formik.handleChange}
								error={
									formik.touched.currentCity &&
									Boolean(formik.errors.currentCity)
								}
								helperText={
									formik.touched.currentCity && formik.errors.currentCity
								}
								// variant='standard'
								// onInput={(event) =>
								// 	updateState({ currentCity: event.target.value })
								// }
							/>
							{/* <label htmlFor='currentState'>State</label> */}
						</Grid>
						<Grid item xs={6} md={2}>
							<TextField
								fullWidth
								id='currentState'
								name='currentState'
								label='State'
								// className='smallField'
								pattern='[A-Z]{2}'
								required
								value={formik.values.currentState}
								onChange={formik.handleChange}
								// onBlur={formik.handleChange}
								error={
									formik.touched.currentState &&
									Boolean(formik.errors.currentState)
								}
								helperText={
									formik.touched.currentState && formik.errors.currentState
								}
								// variant='standard'
								// onInput={(event) =>
								// 	updateState({ currentState: event.target.value })
								// }
							/>
							{/* <label htmlFor='currentZip'>Zip</label> */}
						</Grid>
						<Grid item xs={6} md={2}>
							<TextField
								fullWidth
								id='currentZip'
								name='currentZip'
								label='Zip'
								// className='smallField'
								required
								value={formik.values.currentZip}
								onChange={formik.handleChange}
								// onBlur={formik.handleChange}
								error={
									formik.touched.currentZip && Boolean(formik.errors.currentZip)
								}
								helperText={
									formik.touched.currentZip && formik.errors.currentZip
								}
								// variant='standard'
								// onInput={(event) => updateState({ currentZip: event.target.value })}
							/>
							{/* </div> */}
						</Grid>
					</Grid>
				</Box>

				{/* <div id='submitButtonContainer' className='formLine'>
					<button id='submitButton' type='submit' onClick={handleSubmit}>
						Submit Application
					</button>
				</div> */}
				<Button
					color='primary'
					variant='contained'
					fullWidth
					type='submit'
					// onClick={formik.handleSubmit}
				>
					Submit
				</Button>
			</form>
			{/* </Formik> */}

			<Snackbar
				open={toastOpen}
				autoHideDuration={6000}
				onClose={handleClose}
				message='Application Submitted!'
			/>
			{/* <button onClick={logApplicantObject}>Console Log User Object</button> */}
		</div>
	);
};

export default PersonalInformation;
