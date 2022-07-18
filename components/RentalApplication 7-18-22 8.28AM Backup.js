import React, { useState, useReducer, useRef } from 'react';
// import { Formik, Form, useField } from 'formik';
import { useFormik, withFormik, Formik, getIn, FastField } from 'formik';
// import { withFormik } from 'formik';
import * as Yup from 'yup';
import {
	Alert,
	TextField,
	Radio,
	RadioGroup,
	FormLabel,
	FormControlLabel,
	FormControl,
	Box,
	Grid,
	Snackbar,
	withStyles,
	Card,
	CardContent,
	CardActions,
	MenuItem,
	Button,
	InputAdornment,
} from '@mui/material';
// import { grid } from '@mui/system';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import emailjs from '@emailjs/browser';

const MyTextInput = ({ label, ...props }) => {
	// useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
	// which we can spread on <input>. We can use field meta to show an error
	// message if the field is invalid and it has been touched (i.e. visited)

	const [field, meta] = useField(props);

	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input className='text-input' {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className='error'>{meta.error}</div>
			) : null}
		</>
	);
};

const MyCheckbox = ({ children, ...props }) => {
	// React treats radios and checkbox inputs differently other input types, select, and textarea.
	// Formik does this too! When you specify `type` to useField(), it will
	// return the correct bag of props for you -- a `checked` prop will be included
	// in `field` alongside `name`, `value`, `onChange`, and `onBlur`

	const [field, meta] = useField({ ...props, type: 'checkbox' });

	return (
		<div>
			<label className='checkbox-input'>
				<input type='checkbox' {...field} {...props} />
				{children}
			</label>
			{meta.touched && meta.error ? (
				<div className='error'>{meta.error}</div>
			) : null}
		</div>
	);
};

const MySelect = ({ label, ...props }) => {
	const [field, meta] = useField(props);

	return (
		<div>
			<label htmlFor={props.id || props.name}>{label}</label>
			<select {...field} {...props} />

			{meta.touched && meta.error ? (
				<div className='error'>{meta.error}</div>
			) : null}
		</div>
	);
};

const RentalApplication = () => {
	const [applicationStep, setApplicationStep] = useState(0);
	function stepForward() {
		if (applicationStep < 4) {
			setApplicationStep(applicationStep + 1);
		}
	}
	function stepBackward() {
		if (applicationStep > 0) {
			setApplicationStep(applicationStep - 1);
		}
	}

	// var applicantObject = {
	// 	applicantName: '',
	// 	applicantPhone: '',
	// 	applicantDOB: '',
	// 	applicantEmail: '',
	// 	currentAddress: '',
	// 	currentCity: '',
	// 	currentState: '',
	// 	currentZip: '',
	// 	currentLandlord: '',
	// 	currentLandlordPhone: '',
	// 	currentTenure: '',
	// 	currentReason: '',
	// 	previousAddress: '',
	// 	previousCity: '',
	// 	previousState: '',
	// 	previousZip: '',
	// 	previousLandlord: '',
	// 	previousLandlordPhone: '',
	// 	previousTenure: '',
	// 	previousReason: '',
	// 	presentEmployer: '',
	// 	position: '',
	// 	monthlyIncome: '',
	// 	employerPhone: '',
	// 	employerTenure: '',
	// 	otherIncome: '',
	// 	employersAddress: '',
	// 	employersCity: '',
	// 	employersState: '',
	// 	evictionStatus: false,
	// 	depositMoney: '',
	// 	firstReferenceName: '',
	// 	firstReferenceTenure: '',
	// 	firstReferenceRelationship: '',
	// 	firstReferencePhone: '',
	// 	secondReferenceName: '',
	// 	secondReferenceTenure: '',
	// 	secondReferenceRelationship: '',
	// 	secondReferencePhone: '',
	// 	thirdReferenceName: '',
	// 	thirdReferenceTenure: '',
	// 	thirdReferenceRelationship: '',
	// 	thirdReferencePhone: '',
	// 	adultsNumber: 1,
	// 	childrenNumber: 0,
	// 	otherApplicants: '',
	// 	signedBy: '',
	// 	signatureDate: '',
	// };

	// const [state, updateState] = useReducer(
	// 	(state, updates) => ({ ...state, ...updates }),
	// 	applicantObject
	// );

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
			.oneOf([
				'AL',
				'AK',
				'AZ',
				'AR',
				'CA',
				'CO',
				'CT',
				'DE',
				'DC',
				'FL',
				'GA',
				'HI',
				'ID',
				'IL',
				'IN',
				'IA',
				'KS',
				'KY',
				'LA',
				'ME',
				'MD',
				'MA',
				'MI',
				'MN',
				'MS',
				'MO',
				'MT',
				'NE',
				'NV',
				'NH',
				'NJ',
				'NM',
				'NY',
				'NC',
				'ND',
				'OH',
				'OK',
				'OR',
				'PA',
				'RI',
				'SC',
				'SD',
				'TN',
				'TX',
				'UT',
				'VT',
				'VA',
				'WA',
				'WV',
				'WI',
				'WY',
			])
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
			.oneOf([
				'AL',
				'AK',
				'AZ',
				'AR',
				'CA',
				'CO',
				'CT',
				'DE',
				'DC',
				'FL',
				'GA',
				'HI',
				'ID',
				'IL',
				'IN',
				'IA',
				'KS',
				'KY',
				'LA',
				'ME',
				'MD',
				'MA',
				'MI',
				'MN',
				'MS',
				'MO',
				'MT',
				'NE',
				'NV',
				'NH',
				'NJ',
				'NM',
				'NY',
				'NC',
				'ND',
				'OH',
				'OK',
				'OR',
				'PA',
				'RI',
				'SC',
				'SD',
				'TN',
				'TX',
				'UT',
				'VT',
				'VA',
				'WA',
				'WV',
				'WI',
				'WY',
			])
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
			.oneOf([
				'AL',
				'AK',
				'AZ',
				'AR',
				'CA',
				'CO',
				'CT',
				'DE',
				'DC',
				'FL',
				'GA',
				'HI',
				'ID',
				'IL',
				'IN',
				'IA',
				'KS',
				'KY',
				'LA',
				'ME',
				'MD',
				'MA',
				'MI',
				'MN',
				'MS',
				'MO',
				'MT',
				'NE',
				'NV',
				'NH',
				'NJ',
				'NM',
				'NY',
				'NC',
				'ND',
				'OH',
				'OK',
				'OR',
				'PA',
				'RI',
				'SC',
				'SD',
				'TN',
				'TX',
				'UT',
				'VT',
				'VA',
				'WA',
				'WV',
				'WI',
				'WY',
			])
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

	// const initialValues = {
	// 	applicantName: '',
	// 	applicantPhone: '',
	// 	applicantDOB: '',
	// 	applicantEmail: '',
	// 	currentAddress: '',
	// 	currentCity: '',
	// 	currentState: '',
	// 	currentZip: '',
	// 	currentLandlord: '',
	// 	currentLandlordPhone: '',
	// 	currentTenure: '',
	// 	currentReason: '',
	// 	previousAddress: '',
	// 	previousCity: '',
	// 	previousState: '',
	// 	previousZip: '',
	// 	previousLandlord: '',
	// 	previousLandlordPhone: '',
	// 	previousTenure: '',
	// 	previousReason: '',
	// 	presentEmployer: '',
	// 	position: '',
	// 	monthlyIncome: '',
	// 	employerPhone: '',
	// 	employerTenure: '',
	// 	otherIncome: '',
	// 	employersAddress: '',
	// 	employersCity: '',
	// 	employersState: '',
	// 	evictionStatus: false,
	// 	depositMoney: '',
	// 	firstReferenceName: '',
	// 	firstReferenceTenure: '',
	// 	firstReferenceRelationship: '',
	// 	firstReferencePhone: '',
	// 	secondReferenceName: '',
	// 	secondReferenceTenure: '',
	// 	secondReferenceRelationship: '',
	// 	secondReferencePhone: '',
	// 	thirdReferenceName: '',
	// 	thirdReferenceTenure: '',
	// 	thirdReferenceRelationship: '',
	// 	thirdReferencePhone: '',
	// 	adultsNumber: 1,
	// 	childrenNumber: 0,
	// 	otherApplicants: '',
	// 	signedBy: '',
	// 	signatureDate: '',
	// };

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
				Rental Application
			</h1>
			{/* <form id='applicantForm' ref={form} onSubmit={sendEmail}> */}
			<form id='applicantForm' ref={form} onSubmit={formik.handleSubmit}>
				{applicationStep === 0 && (
					<Box sx={{ flexGrow: 1 }}>
						<h3>Personal Information</h3>
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
										required
										value={formik.values.applicantDOB || null}
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
										formik.touched.applicantPhone &&
										formik.errors.applicantPhone
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
										formik.touched.applicantEmail &&
										formik.errors.applicantEmail
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
							<Grid item xs={6} md={12}>
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
										formik.touched.currentAddress &&
										formik.errors.currentAddress
									}
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ currentAddress: event.target.value })
									// }
								/>
								{/* <label htmlFor='currentCity'>City</label> */}
							</Grid>
							<Grid item xs={6} md={6}>
								<TextField
									fullWidth
									id='currentCity'
									name='currentCity'
									label='City'
									// className='smallField'
									required
									value={formik.values.currentCity}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
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
							<Grid item xs={6} md={3}>
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
							<Grid item xs={6} md={3}>
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
										formik.touched.currentZip &&
										Boolean(formik.errors.currentZip)
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
						<p>LOCATION APPLYING FOR PLACEHOLDER</p>
						<Button
							variant='contained'
							onClick={() => {
								stepForward();
							}}
						>
							Next Page
						</Button>
					</Box>
				)}
				{applicationStep === 1 && (
					<Box sx={{ flexGrow: 1 }}>
						<h3>Rental History</h3>
						<Grid container spacing={2}>
							<Grid item xs={6} md={6}>
								{/* <div className='formLine'> */}
								{/* <label htmlFor='currentLandlord'>Current Landlords Name</label> */}
								<TextField
									id='currentLandlord'
									name='currentLandlord'
									label="Current Landlord's Name"
									// className='largeField'
									value={formik.values.currentLandlord}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.currentLandlord &&
										Boolean(formik.errors.currentLandlord)
									}
									helperText={
										formik.touched.currentLandlord &&
										formik.errors.currentLandlord
									}
									fullWidth
									required
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ currentLandlord: event.target.value })
									// }
								/>
								{/* <label htmlFor='currentLandlordPhone'>Landlords #</label> */}
							</Grid>
							<Grid item xs={6} md={6}>
								<TextField
									id='currentLandlordPhone'
									name='currentLandlordPhone'
									label="Current Landlord's Phone"
									value={formik.values.currentLandlordPhone}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.currentLandlordPhone &&
										Boolean(formik.errors.currentLandlordPhone)
									}
									helperText={
										formik.touched.currentLandlordPhone &&
										formik.errors.currentLandlordPhone
									}
									required
									fullWidth
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ currentLandlordPhone: event.target.value })
									// }
								/>
								{/* </div> */}
							</Grid>
							<Grid item xs={6} md={6}>
								{/* <div className='formLine'> */}
								{/* <label htmlFor='currentTenure'>How long at this address?</label> */}
								<TextField
									id='currentTenure'
									name='currentTenure'
									label='How long at this address?'
									value={formik.values.currentTenure}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.currentTenure &&
										Boolean(formik.errors.currentTenure)
									}
									helperText={
										formik.touched.currentTenure && formik.errors.currentTenure
									}
									required
									fullWidth
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ currentTenure: event.target.value })
									// }
								/>
								{/* <label htmlFor='currentReason'>Reason for leaving?</label> */}
							</Grid>
							<Grid item xs={6} md={6}>
								<TextField
									id='currentReason'
									name='currentReason'
									label='Reason for leaving?'
									value={formik.values.currentReason}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.currentReason &&
										Boolean(formik.errors.currentReason)
									}
									helperText={
										formik.touched.currentReason && formik.errors.currentReason
									}
									required
									fullWidth
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ currentReason: event.target.value })
									// }
								/>
								{/* </div> */}
							</Grid>
							<Grid item xs={6} md={12}>
								{/* <div className='formLine'> */}
								{/* <label htmlFor='previousAddress'>Previous Address</label> */}
								<TextField
									id='previousAddress'
									name='previousAddress'
									label='Previous Address'
									value={formik.values.previousAddress}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.previousAddress &&
										Boolean(formik.errors.previousAddress)
									}
									helperText={
										formik.touched.previousAddress &&
										formik.errors.previousAddress
									}
									required
									fullWidth
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ previousAddress: event.target.value })
									// }
								/>
								{/* <label htmlFor='previousCity'>City</label> */}
							</Grid>
							<Grid item xs={6} md={6}>
								<TextField
									id='previousCity'
									name='previousCity'
									label='City'
									value={formik.values.previousCity}
									onChange={formik.fullWidth}
									// onBlur={formik.handleChange}
									error={
										formik.touched.previousCity &&
										Boolean(formik.errors.previousCity)
									}
									helperText={
										formik.touched.previousCity && formik.errors.previousCity
									}
									required
									fullWidth
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ previousCity: event.target.value })
									// }
								/>
								{/* <label htmlFor='previousState'>State</label> */}
							</Grid>
							<Grid item xs={6} md={3}>
								<TextField
									id='previousState'
									name='previousState'
									label='State'
									pattern='[A-Z]{2}'
									value={formik.values.previousState}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.previousState &&
										Boolean(formik.errors.previousState)
									}
									helperText={
										formik.touched.previousState && formik.errors.previousState
									}
									required
									fullWidth
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ previousState: event.target.value })
									// }
								/>
								{/* <label htmlFor='previousZip'>Zip</label> */}
							</Grid>
							<Grid item xs={6} md={3}>
								<TextField
									id='previousZip'
									name='previousZip'
									label='Zip'
									value={formik.values.previousZip}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.previousZip &&
										Boolean(formik.errors.previousZip)
									}
									helperText={
										formik.touched.previousZip && formik.errors.previousZip
									}
									required
									fullWidth
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ previousZip: event.target.value })
									// }
								/>
								{/* </div> */}
							</Grid>
							<Grid item xs={6} md={6}>
								{/* <div className='formLine'> */}
								{/* <label htmlFor='previousLandlord'>Previous Landlords Name</label> */}
								<TextField
									id='previousLandlord'
									name='previousLandlord'
									label="Previous Landlord's Name"
									value={formik.values.previousLandlord}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.previousLandlord &&
										Boolean(formik.errors.previousLandlord)
									}
									helperText={
										formik.touched.previousLandlord &&
										formik.errors.previousLandlord
									}
									required
									fullWidth
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ previousLandlord: event.target.value })
									// }
								/>
								{/* <label htmlFor='previousLandlordPhone'>Landlords #</label> */}
							</Grid>
							<Grid item xs={6} md={6}>
								<TextField
									id='previousLandlordPhone'
									name='previousLandlordPhone'
									label="Previous Landlord's Phone"
									value={formik.values.previousLandlordPhone}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.previousLandlordPhone &&
										Boolean(formik.errors.previousLandlordPhone)
									}
									helperText={
										formik.touched.previousLandlordPhone &&
										formik.errors.previousLandlordPhone
									}
									required
									fullWidth
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ previousLandlordPhone: event.target.value })
									// }
								/>
								{/* </div> */}
							</Grid>
							<Grid item xs={6} md={6}>
								{/* <div className='formLine'> */}
								{/* <label htmlFor='previousTenure'>How many years at this address?</label> */}
								<TextField
									id='previousTenure'
									name='previousTenure'
									label='How many years at this address?'
									value={formik.values.previousTenure}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.previousTenure &&
										Boolean(formik.errors.previousTenure)
									}
									helperText={
										formik.touched.previousTenure &&
										formik.errors.previousTenure
									}
									required
									fullWidth
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ previousTenure: event.target.value })
									// }
								/>
								{/* <label htmlFor='previousReason'>Reason for leaving?</label> */}
							</Grid>
							<Grid item xs={6} md={6}>
								<TextField
									id='previousReason'
									name='previousReason'
									label='Reason for leaving?'
									value={formik.values.previousReason}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.previousReason &&
										Boolean(formik.errors.previousReason)
									}
									helperText={
										formik.touched.previousReason &&
										formik.errors.previousReason
									}
									required
									fullWidth
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ previousReason: event.target.value })
									// }
								/>
								{/* </div> */}
							</Grid>
							<Grid item xs={6} md={12}>
								<Box
									sx={{
										display: 'flex',
										width: '100%',
										justifyContent: 'space-between',
									}}
								>
									<Button
										variant='contained'
										onClick={() => {
											stepBackward();
										}}
									>
										Previous Page
									</Button>
									<Button
										variant='contained'
										onClick={() => {
											stepForward();
										}}
									>
										Next Page
									</Button>
								</Box>
							</Grid>
						</Grid>
					</Box>
				)}
				{applicationStep === 2 && (
					<Box sx={{ flexGrow: 1 }}>
						<h3>Employment History</h3>
						<Grid container spacing={2}>
							{/* <div className='formLine'> */}
							{/* <label htmlFor='presentEmployer'>Present Employer</label> */}
							<Grid item xs={6} md={12}>
								<TextField
									id='presentEmployer'
									name='presentEmployer'
									label='Present Employer'
									value={formik.values.presentEmployer}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.presentEmployer &&
										Boolean(formik.errors.presentEmployer)
									}
									helperText={
										formik.touched.presentEmployer &&
										formik.errors.presentEmployer
									}
									required
									fullWidth
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ presentEmployer: event.target.value })
									// }
								/>
								{/* <label htmlFor='position'>Position</label> */}
							</Grid>
							<Grid item xs={6} md={6}>
								<TextField
									id='position'
									name='position'
									label='Position'
									value={formik.values.position}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.position && Boolean(formik.errors.position)
									}
									helperText={formik.touched.position && formik.errors.position}
									required
									fullWidth
									// variant='standard'
									// onInput={(event) => updateState({ position: event.target.value })}
								/>
								{/* <label htmlFor='monthlyIncome'>Monthly Income</label> */}
							</Grid>
							<Grid item xs={6} md={6}>
								<TextField
									id='monthlyIncome'
									name='monthlyIncome'
									label='Monthly Income'
									value={formik.values.monthlyIncome}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.monthlyIncome &&
										Boolean(formik.errors.monthlyIncome)
									}
									helperText={
										formik.touched.monthlyIncome && formik.errors.monthlyIncome
									}
									required
									fullWidth
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ monthlyIncome: event.target.value })
									// }
								/>
								{/* </div> */}
							</Grid>
							<Grid item xs={6} md={6}>
								{/* <div className='formLine'> */}
								{/* <label htmlFor='employerPhone'>Phone #</label> */}
								<TextField
									id='employerPhone'
									name='employerPhone'
									label='Employer Phone Number'
									value={formik.values.employerPhone}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.employerPhone &&
										Boolean(formik.errors.employerPhone)
									}
									helperText={
										formik.touched.employerPhone && formik.errors.employerPhone
									}
									required
									fullWidth
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ employerPhone: event.target.value })
									// }
								/>
								{/* <label htmlFor='employerTenure'>How long at job</label> */}
							</Grid>
							<Grid item xs={6} md={6}>
								<TextField
									id='employerTenure'
									name='employerTenure'
									label='How long at current job?'
									value={formik.values.employerTenure}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.employerTenure &&
										Boolean(formik.errors.employerTenure)
									}
									helperText={
										formik.touched.employerTenure &&
										formik.errors.employerTenure
									}
									required
									fullWidth
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ employerTenure: event.target.value })
									// }
								/>
								{/* <label htmlFor='otherIncome'>Other income source</label> */}
							</Grid>
							<Grid item xs={6} md={12}>
								<TextField
									id='otherIncome'
									name='otherIncome'
									label='Other Income Sources?'
									value={formik.values.otherIncome}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.otherIncome &&
										Boolean(formik.errors.otherIncome)
									}
									helperText={
										formik.touched.otherIncome && formik.errors.otherIncome
									}
									required
									fullWidth
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ otherIncome: event.target.value })
									// }
								/>
								{/* </div> */}
							</Grid>
							<Grid item xs={6} md={12}>
								{/* <div className='formLine'> */}
								{/* <label htmlFor='employersAddress'>Employer's Address</label> */}
								<TextField
									id='employersAddress'
									name='employersAddress'
									label='Employers Address'
									value={formik.values.employersAddress}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.employersAddress &&
										Boolean(formik.errors.employersAddress)
									}
									helperText={
										formik.touched.employersAddress &&
										formik.errors.employersAddress
									}
									required
									fullWidth
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ employersAddress: event.target.value })
									// }
								/>
								{/* <label htmlFor='employersCity'>City</label> */}
							</Grid>
							<Grid item xs={6} md={6}>
								<TextField
									id='employersCity'
									name='employersCity'
									label='City'
									value={formik.values.employersCity}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.employersCity &&
										Boolean(formik.errors.employersCity)
									}
									helperText={
										formik.touched.employersCity && formik.errors.employersCity
									}
									required
									fullWidth
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ employersCity: event.target.value })
									// }
								/>
								{/* <label htmlFor='employersState'>State</label> */}
							</Grid>
							<Grid item xs={6} md={3}>
								<TextField
									id='employersState'
									name='employersState'
									label='State'
									pattern='[A-Z]{2}'
									value={formik.values.employersState}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.employersState &&
										Boolean(formik.errors.employersState)
									}
									helperText={
										formik.touched.employersState &&
										formik.errors.employersState
									}
									required
									fullWidth
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ employersState: event.target.value })
									// }
								/>
								{/* </div> */}
							</Grid>
							<Grid item xs={6} md={12}>
								<Box
									sx={{
										display: 'flex',
										width: '100%',
										justifyContent: 'space-between',
									}}
								>
									<Button
										variant='contained'
										onClick={() => {
											stepBackward();
										}}
									>
										Previous Page
									</Button>
									<Button
										variant='contained'
										onClick={() => {
											stepForward();
										}}
									>
										Next Page
									</Button>
								</Box>
							</Grid>
						</Grid>
					</Box>
				)}
				{applicationStep === 3 && (
					<Box sx={{ flexGrow: 1 }}>
						<h3>References / Other</h3>
						<Grid container spacing={2}>
							<Grid item xs={6} md={12}>
								{/* <div className='formLine'> */}
								{/* <label htmlFor='firstReferenceName'>Name</label> */}
								<TextField
									id='firstReferenceName'
									name='firstReferenceName'
									label='Reference #1 Name'
									value={formik.values.firstReferenceName}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.firstReferenceName &&
										Boolean(formik.errors.firstReferenceName)
									}
									helperText={
										formik.touched.firstReferenceName &&
										formik.errors.firstReferenceName
									}
									required
									fullWidth
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ firstReferenceName: event.target.value })
									// }
								/>
								{/* <label htmlFor='firstReferenceTenure'>Yrs. Known</label> */}
							</Grid>
							<Grid item xs={6} md={4}>
								<TextField
									id='firstReferenceTenure'
									name='firstReferenceTenure'
									label='Years Known'
									value={formik.values.firstReferenceTenure}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.firstReferenceTenure &&
										Boolean(formik.errors.firstReferenceTenure)
									}
									helperText={
										formik.touched.firstReferenceTenure &&
										formik.errors.firstReferenceTenure
									}
									required
									fullWidth

									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ firstReferenceTenure: event.target.value })
									// }
								/>
							</Grid>
							<Grid item xs={6} md={4}>
								{/* <label htmlFor='firstReferenceRelationship'>Relationship</label> */}
								<TextField
									id='firstReferenceRelationship'
									name='firstReferenceRelationship'
									label='Relationship'
									value={formik.values.firstReferenceRelationship}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.firstReferenceRelationship &&
										Boolean(formik.errors.firstReferenceRelationship)
									}
									helperText={
										formik.touched.firstReferenceRelationship &&
										formik.errors.firstReferenceRelationship
									}
									required
									fullWidth

									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ firstReferenceRelationship: event.target.value })
									// }
								/>
								{/* <label htmlFor='firstReferencePhone'>Phone #</label> */}
							</Grid>
							<Grid item xs={6} md={4}>
								<TextField
									id='firstReferencePhone'
									name='firstReferencePhone'
									label='Phone Number'
									value={formik.values.firstReferencePhone}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.firstReferencePhone &&
										Boolean(formik.errors.firstReferencePhone)
									}
									helperText={
										formik.touched.firstReferencePhone &&
										formik.errors.firstReferencePhone
									}
									required
									fullWidth

									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ firstReferencePhone: event.target.value })
									// }
								/>
								{/* </div>
								 */}
							</Grid>
							<Grid item xs={6} md={12}>
								{/* <div className='formLine'> */}
								{/* <label htmlFor='secondReferenceName'>Name</label> */}
								<TextField
									id='secondReferenceName'
									name='secondReferenceName'
									label='Reference #2 Name'
									value={formik.values.secondReferenceName}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.secondReferenceName &&
										Boolean(formik.errors.secondReferenceName)
									}
									helperText={
										formik.touched.secondReferenceName &&
										formik.errors.secondReferenceName
									}
									required
									fullWidth

									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ secondReferenceName: event.target.value })
									// }
								/>
							</Grid>
							<Grid item xs={6} md={4}>
								{/* <label htmlFor='secondReferenceTenure'>Yrs. Known</label> */}
								<TextField
									id='secondReferenceTenure'
									name='secondReferenceTenure'
									label='Years Known'
									value={formik.values.secondReferenceTenure}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.secondReferenceTenure &&
										Boolean(formik.errors.secondReferenceTenure)
									}
									helperText={
										formik.touched.secondReferenceTenure &&
										formik.errors.secondReferenceTenure
									}
									required
									fullWidth

									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ secondReferenceTenure: event.target.value })
									// }
								/>
							</Grid>
							<Grid item xs={6} md={4}>
								{/* <label htmlFor='secondReferenceRelationship'>Relationship</label> */}
								<TextField
									id='secondReferenceRelationship'
									name='secondReferenceRelationship'
									label='Relationship'
									value={formik.values.secondReferenceRelationship}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.secondReferenceRelationship &&
										Boolean(formik.errors.secondReferenceRelationship)
									}
									helperText={
										formik.touched.secondReferenceRelationship &&
										formik.errors.secondReferenceRelationship
									}
									required
									fullWidth

									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ secondReferenceRelationship: event.target.value })
									// }
								/>
							</Grid>
							<Grid item xs={6} md={4}>
								{/* <label htmlFor='secondReferencePhone'>Phone #</label> */}
								<TextField
									id='secondReferencePhone'
									name='secondReferencePhone'
									label='Phone Number'
									value={formik.values.secondReferencePhone}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.secondReferencePhone &&
										Boolean(formik.errors.secondReferencePhone)
									}
									helperText={
										formik.touched.secondReferencePhone &&
										formik.errors.secondReferencePhone
									}
									required
									fullWidth

									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ secondReferencePhone: event.target.value })
									// }
								/>
								{/* </div> */}
							</Grid>
							<Grid item xs={6} md={12}>
								{/* <div className='formLine'> */}
								{/* <label htmlFor='thirdReferenceName'>Name</label> */}
								<TextField
									id='thirdReferenceName'
									name='thirdReferenceName'
									label='Reference #3 Name'
									value={formik.values.thirdReferenceName}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.thirdReferenceName &&
										Boolean(formik.errors.thirdReferenceName)
									}
									helperText={
										formik.touched.thirdReferenceName &&
										formik.errors.thirdReferenceName
									}
									required
									fullWidth

									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ thirdReferenceName: event.target.value })
									// }
								/>
								{/* <label htmlFor='thirdReferenceTenure'>Yrs. Known</label> */}
							</Grid>
							<Grid item xs={6} md={4}>
								<TextField
									id='thirdReferenceTenure'
									name='thirdReferenceTenure'
									label='Years Known'
									value={formik.values.thirdReferenceTenure}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.thirdReferenceTenure &&
										Boolean(formik.errors.thirdReferenceTenure)
									}
									helperText={
										formik.touched.thirdReferenceTenure &&
										formik.errors.thirdReferenceTenure
									}
									required
									fullWidth

									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ thirdReferenceTenure: event.target.value })
									// }
								/>
							</Grid>
							<Grid item xs={6} md={4}>
								{/* <label htmlFor='thirdReferenceRelationship'>Relationship</label> */}
								<TextField
									id='thirdReferenceRelationship'
									name='thirdReferenceRelationship'
									label='Relationship'
									value={formik.values.thirdReferenceRelationship}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.thirdReferenceRelationship &&
										Boolean(formik.errors.thirdReferenceRelationship)
									}
									helperText={
										formik.touched.thirdReferenceRelationship &&
										formik.errors.thirdReferenceRelationship
									}
									required
									fullWidth

									// useState code below
									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ thirdReferenceRelationship: event.target.value })
									// }
								/>
								{/* <label htmlFor='thirdReferencePhone'>Phone #</label> */}
							</Grid>
							<Grid item xs={6} md={4}>
								<TextField
									id='thirdReferencePhone'
									name='thirdReferencePhone'
									label='Phone Number'
									value={formik.values.thirdReferencePhone}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.thirdReferencePhone &&
										Boolean(formik.errors.thirdReferencePhone)
									}
									helperText={
										formik.touched.thirdReferencePhone &&
										formik.errors.thirdReferencePhone
									}
									required
									fullWidth

									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ thirdReferencePhone: event.target.value })
									// }
								/>
								{/* </div> */}
							</Grid>
							<Grid item xs={6} md={6}>
								{/* <div className='formLine'> */}
								{/* <label htmlFor='adultsNumber'>Total number of adults</label> */}
								<TextField
									// autoWidth
									id='adultsNumber'
									name='adultsNumber'
									label='Total Number of Adults'
									inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
									type='number'
									value={formik.values.adultsNumber}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.adultsNumber &&
										Boolean(formik.errors.adultsNumber)
									}
									helperText={
										formik.touched.adultsNumber && formik.errors.adultsNumber
									}
									required
									fullWidth

									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ adultsNumber: event.target.value })
									// }
								/>
							</Grid>
							<Grid item xs={6} md={6}>
								{/* <label htmlFor='childrenNumber'>
						Total number of children living with you under the age of 18
					</label> */}
								<TextField
									// autoWidth
									id='childrenNumber'
									name='childrenNumber'
									label='Total Number of Children Under Age 18'
									inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
									type='number'
									value={formik.values.childrenNumber}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.childrenNumber &&
										Boolean(formik.errors.childrenNumber)
									}
									helperText={
										formik.touched.childrenNumber &&
										formik.errors.childrenNumber
									}
									required
									fullWidth

									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ childrenNumber: event.target.value })
									// }
								/>
								{/* </div> */}
							</Grid>
							<Grid item xs={6} md={5}>
								{/* <div className='formLine'> */}
								<label htmlFor='otherApplicants'>
									Names and relations of all other applicants
								</label>
								<TextField
									id='otherApplicants'
									name='otherApplicants'
									value={formik.values.otherApplicants}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.otherApplicants &&
										Boolean(formik.errors.otherApplicants)
									}
									helperText={
										formik.touched.applicantDOB && formik.errors.otherApplicants
									}
									required
									fullWidth

									// variant='standard'
									// onInput={(event) =>
									// 	updateState({ otherApplicants: event.target.value })
									// }
								/>
								{/* </div> */}
							</Grid>
							<Grid item xs={6} md={12}>
								{/* <div className='formLine'> */}
								{/* <label htmlFor='evictionRadioButtons'>
						Have you ever been party to an eviction?
					</label> */}
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<FormLabel id='evictionRadioButtons'>
										Have you ever been party to an eviction?
									</FormLabel>
									<RadioGroup
										row
										aria-labelledby='evictionRadioButtons'
										// name='row-radio-buttons-group'
										name='evictionStatus'
										// id='evictionRadioButtons'
										label='TESTING'
										value={formik.values.evictionStatus}
										onChange={formik.handleChange}
										// onBlur={formik.handleChange}
										// error={
										// 	formik.touched.evictionStatus &&
										// 	Boolean(formik.errors.evictionStatus)
										// }
										// helperText={
										// 	formik.touched.evictionStatus && formik.errors.evictionStatus
										// }
										// required
									>
										{/* <input
							id='evictionStatus'
							name='evictionStatus'
							value={formik.values.evictionStatus}
							onChange={formik.handleChange}
							error={
								formik.touched.evictionStatus &&
								Boolean(formik.errors.evictionStatus)
							}
							helperText={
								formik.touched.evictionStatus && formik.errors.evictionStatus
							}
							readOnly
						></input> */}
										<div id='evictionButtonContainer'>
											<FormControlLabel
												value='true'
												control={<Radio />}
												label='Yes'
												// onClick={() => updateState({ evictionStatus: true })}
												// value={formik.values.applicantDOB}
												// onChange={formik.handleChange}
												// error={
												// 	formik.touched.applicantDOB &&
												// 	Boolean(formik.errors.applicantDOB)
												// }
												// helperText={
												// 	formik.touched.applicantDOB && formik.errors.applicantDOB
												// }
											/>
											<FormControlLabel
												value='false'
												control={<Radio />}
												label='No'
												// onClick={() => updateState({ evictionStatus: false })}
												// value={formik.values.applicantDOB}
												// onChange={formik.handleChange}
												// error={
												// 	formik.touched.applicantDOB &&
												// 	Boolean(formik.errors.applicantDOB)
												// }
												// helperText={
												// 	formik.touched.applicantDOB && formik.errors.applicantDOB
												// }
											/>
										</div>
									</RadioGroup>
								</Box>

								{/* <label htmlFor='depositMoney'>Money for deposit?</label> */}
							</Grid>
							<Grid item xs={6} md={5}>
								<TextField
									id='depositMoney'
									name='depositMoney'
									label='Money for deposit?'
									value={formik.values.depositMoney}
									onChange={formik.handleChange}
									// onBlur={formik.handleChange}
									error={
										formik.touched.depositMoney &&
										Boolean(formik.errors.depositMoney)
									}
									helperText={
										formik.touched.depositMoney && formik.errors.depositMoney
									}
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>$</InputAdornment>
										),
										// variant='standard'
										// onInput={(event) =>
										// 	updateState({ depositMoney: event.target.value })
										// }
									}}
									required
									fullWidth
								/>
								{/* </div> */}
								{/* <div id='referenceHeader' className='formLine'>
									Personal References:
								</div> */}
							</Grid>
							<Grid item xs={6} md={12}>
								<Box
									sx={{
										display: 'flex',
										width: '100%',
										justifyContent: 'space-between',
									}}
								>
									<Button
										variant='contained'
										onClick={() => {
											stepBackward();
										}}
									>
										Previous Page
									</Button>
									<Button
										variant='contained'
										onClick={() => {
											stepForward();
										}}
									>
										Next Page
									</Button>
								</Box>
							</Grid>
						</Grid>
					</Box>
				)}
				{applicationStep === 4 && (
					<Box sx={{ flexGrow: 1 }}>
						<h3>Signature Page</h3>
						<Grid container spacing={2}>
							<Grid item xs={6} md={12}>
								{/* <div id='certificationParagraph' className='formLine'> */}I
								CERTIFY that answers given herein are true and complete to the
								best of my knowledge. I authorize investigation of all
								statements contained in this application for tenant screening as
								may be necessary in arriving at a tenant decision. I understand
								that the landlord may terminate any rental agreement entered
								into for any misrepresentations made above.
								{/* </div>
						<div className='formLine'> */}
							</Grid>
							<Grid item xs={6} md={4}>
								{/* <label htmlFor='signature'>Signature</label> */}
								<TextField
									id='signedBy'
									name='signedBy'
									label='Signature'
									required
									value={formik.values.signedBy}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.signedBy && Boolean(formik.errors.signedBy)
									}
									helperText={formik.touched.signedBy && formik.errors.signedBy}
									// variant='standard'
									// onInput={(event) => updateState({ signedBy: event.target.value })}
								/>
							</Grid>
							<Grid item xs={6} md={4}>
								{/* <label htmlFor='date'>Date</label> */}
								{/* <TextField
								id='signatureDate'
								name='signatureDate'
								label="Today's Date"
								type='date'
								placeholder=''
								required
								value={formik.values.signatureDate}
								onChange={formik.handleChange}
								error={
									formik.touched.signatureDate &&
									Boolean(formik.errors.signatureDate)
								}
								helperText={
									formik.touched.signatureDate && formik.errors.signatureDate
								}
								// variant='standard'
								// onInput={(event) =>
								// 	updateState({ signatureDate: event.target.value })
								// }
							/> */}
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										fullWidth
										id='signatureDate'
										name='signatureDate'
										label='Signature Date'
										// className='smallField'
										// format='MM/dd/yyyy'
										inputFormat='MM/dd/yyyy'
										required
										value={formik.values.signatureDate || null}
										// onChange={formik.handleChange}
										// onChange={(value) =>
										// 	formik.handleChange('values.signatureDate', value)
										// }
										onChange={(value) => {
											console.log('___', value);
											formik.setFieldValue('signatureDate', value);
										}}
										onBlur={formik.handleBlur}
										error={
											formik.touched.signatureDate &&
											Boolean(formik.errors.signatureDate)
										}
										helperText={
											formik.touched.signatureDate &&
											formik.errors.signatureDate
										}
										renderInput={(params) => <TextField {...params} />}
									/>
								</LocalizationProvider>
								{/* </div> */}
							</Grid>
							<Grid item xs={6} md={12}>
								{/* <div id='submitButtonContainer' className='formLine'> */}
								<Box
									sx={{
										display: 'flex',
										width: '100%',
										justifyContent: 'space-between',
									}}
								>
									<Button
										variant='contained'
										onClick={() => {
											stepBackward();
										}}
										required
										fullwidth
									>
										Previous Page
									</Button>
									{/* <button id='submitButton' onClick={handleSubmit}>
								Submit Application
							</button> */}
									<Button
										id='submitButton'
										variant='outlined'
										onClick={handleSubmit}
										required
										fullwidth
									>
										Submit Application
									</Button>
								</Box>
							</Grid>
						</Grid>
						{/* </div> */}

						{/* ------ */}
					</Box>
				)}
			</form>
			{/* </Formik> */}

			<Snackbar
				open={toastOpen}
				autoHideDuration={6000}
				onClose={handleClose}
				message='Application Submitted!'
			/>
			<button onClick={logApplicantObject}>Console Log User Object</button>
		</div>
	);
};

export default RentalApplication;
