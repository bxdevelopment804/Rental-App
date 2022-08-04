import React, { useState, useRef, useContext } from 'react';
import Head from 'next/head';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	Alert,
	Box,
	Grid,
	Snackbar,
	Button,
	Step,
	Stepper,
	StepLabel,
	Typography,
} from '@mui/material';
import emailjs from '@emailjs/browser';
import NumberFormat from 'react-number-format';
import PersonalInformation from '../components/PersonalInformation';
import RentalHistory from '../components/RentalHistory';
import EmploymentHistory from '../components/EmploymentHistory';
import References from '../components/References';
import Signature from '../components/Signature';

// import useTheme from '@mui/material';
// import useMediaQuery from '@mui/material';
// import { useTheme, useMediaQuery } from '@material-ui/core';

import { currentStepContext } from '../context/currentStepProvider';

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

function NumberFormatCustom(props) {
	const { inputRef, onChange, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			}}
			thousandSeparator
			// isNumericString
		/>
	);
}

const RentalApplication = () => {
	// const showText = useMediaQuery('(min-width:600px)');
	// const theme = useTheme();
	// const showText = useMediaQuery(theme.breakpoints.up('sm'));

	//-------------------
	//useTransition State
	// const [isPending, startTransition] = useTransition();

	//---------------------------
	//Navigation Button Functions
	// const [applicationStep, setApplicationStep] = useState(0);
	// function stepForward() {
	// 	if (applicationStep < 4) {
	// 		setApplicationStep(applicationStep + 1);
	// 	}
	// }
	// function stepBackward() {
	// 	if (applicationStep > 0) {
	// 		setApplicationStep(applicationStep - 1);
	// 	}
	// }

	//-------------------------------------
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
		// const handleSubmit = () => {
		console.log('Form Submitted');
		formik.handleSubmit();
		<Alert severity='success'>This is a success alert — check it out!</Alert>;
	}

	//-------------------------
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

		// console.log(JSON.stringify(form.current, null, 2));
		// updateState(applicantObject);

		// FOR TESTING ONLY - REMOVE WHEN COMPLETE!!!
		currentStep[1](currentStep[0] + 1);
		console.table(formikPersonalInformation.values);

		handleClick();
	};

	//--------------------------------------------------------------------
	//Testing the current state values.  FOR TESTING ONLY - DELETE LATER
	// function logApplicantObject() {
	// 	console.log('Applicant Object');
	// 	console.table(state);
	// 	// console.dir(state);
	// }

	const validationSchema = Yup.object({
		applicantName: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.matches(
				/^[a-zA-Z ']+$/,
				'No numbers or symbols are needed for this field.'
			)
			.required('Required'),
		applicantPhone: Yup.string()
			.max(10, 'Must be 10 digits.')
			.min(10, 'Must be 10 digits.')
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
			.matches(
				/^[a-zA-Z ']+$/,
				'No numbers or symbols are needed for this field.'
			)
			.required('Required'),
		currentState: Yup.string()
			.max(2, 'Enter two letter state abbreviation.')
			.min(2, 'Enter two letter state abbreviation.')
			.matches(/^[a-zA-Z]+$/, 'Enter two letter state abbreviation.')
			.required('Required'),
		currentZip: Yup.string()
			.max(5, 'Must be five digits.')
			.min(5, 'Must be five digits.')
			.matches(/^\d*$/, 'Enter five digit zip code.')
			.required('Required'),
		desiredLocation: Yup.string()
			.max(50, 'Must be 50 characters or less')
			.required('Required'),
		desiredLocation: Yup.string()
			.max(50, 'Must be 50 characters or less')
			.required('Required'),
		currentLandlord: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		currentLandlordPhone: Yup.string()
			.max(10, 'Must be 10 digits.')
			.min(10, 'Must be 10 digits.')
			.required('Required'),
		// currentTenure: Yup.number('Please use numbers, not letters.')
		currentTenure: Yup.string()
			.required('Required')
			.max(20, 'Must be 20 characters or less'),
		// .integer('Please use numbers, not letters.')
		// .positive('No negative numbers allowed.')
		// .max(30, 'Please validate this entry.'),
		// .matches(/^\d*$/, 'Please use numbers, not letters.')
		currentReason: Yup.string()
			.max(50, 'Response must be 50 characters or less')
			.required('Required'),
		previousAddress: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		previousCity: Yup.string()
			.max(20, 'Must be 20 characters or less')
			.matches(
				/^[a-zA-Z ']+$/,
				'No numbers or symbols are needed for this field.'
			)
			.required('Required'),
		previousState: Yup.string()
			.max(2, 'Enter two letter state abbreviation.')
			.min(2, 'Enter two letter state abbreviation.')
			.matches(/^[a-zA-Z]+$/, 'Enter two letter state abbreviation.')
			.required('Required'),
		previousZip: Yup.string()
			.max(5, 'Must be five digits.')
			.min(5, 'Must be five digits.')
			.matches(/^\d*$/, 'Enter five digit zip code.')
			.required('Required'),
		previousLandlord: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.matches(
				/^[a-zA-Z ']+$/,
				'No numbers or symbols are needed for this field.'
			)
			.required('Required'),
		previousLandlordPhone: Yup.string()
			.max(10, 'Must be 10 digits.')
			.min(10, 'Must be 10 digits.')
			.required('Required'),
		previousTenure: Yup.string()
			.required('Required')
			.max(20, 'Must be 20 characters or less'),
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
			.max(10, 'Must be 10 digits.')
			.min(10, 'Must be 10 digits.')
			.required('Required'),
		employerTenure: Yup.string()
			.required('Required')
			.max(20, 'Must be 20 characters or less'),
		otherIncome: Yup.string()
			.max(7, 'Response must be 7 characters or less')
			.required('Required'),
		employerAddress: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		employerCity: Yup.string()
			.max(20, 'Must be 20 characters or less')
			.matches(
				/^[a-zA-Z ']+$/,
				'No numbers or symbols are needed for this field.'
			)
			.required('Required'),
		employerState: Yup.string()
			.max(2, 'Enter two letter state abbreviation.')
			.min(2, 'Enter two letter state abbreviation.')
			.matches(/^[a-zA-Z]+$/, 'Enter two letter state abbreviation.')
			.required('Required'),
		firstReferenceName: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.matches(
				/^[a-zA-Z ']+$/,
				'No numbers or symbols are needed for this field.'
			)
			.required('Required'),
		firstReferenceTenure: Yup.string()
			.required('Required')
			.max(20, 'Must be 20 characters or less'),
		firstReferenceRelationship: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		firstReferencePhone: Yup.string()
			.max(10, 'Must be 10 characters or less.  No symbols needed.')
			.required('Required'),
		secondReferenceName: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.matches(
				/^[a-zA-Z ']+$/,
				'No numbers or symbols are needed for this field.'
			)
			.required('Required'),
		secondReferenceTenure: Yup.string()
			.required('Required')
			.max(20, 'Must be 20 characters or less'),
		secondReferenceRelationship: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		secondReferencePhone: Yup.string()
			.max(10, 'Must be 10 characters or less.  No symbols needed.')
			.required('Required'),
		thirdReferenceName: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.matches(
				/^[a-zA-Z ']+$/,
				'No numbers or symbols are needed for this field.'
			)
			.required('Required'),
		thirdReferenceTenure: Yup.string()
			.required('Required')
			.max(20, 'Must be 20 characters or less'),
		thirdReferenceRelationship: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		thirdReferencePhone: Yup.string()
			.max(10, 'Must be 10 characters or less.  No symbols needed.')
			.required('Required'),
		adultsNumber: Yup.number()
			// .max(1, 'Must be one character')
			.positive()
			.integer()
			.required('Required'),
		childrenNumber: Yup.number()
			// .max(1, 'Must be one character')
			.positive()
			.integer()
			.required('Required'),
		otherApplicants: Yup.string()
			.max(
				35,
				'Please enter the names of other applicants that need to be added to the lease.'
			)
			.required('Required'),
		evictionStatus: Yup.boolean().required('Required').oneOf([true, false]),
		// .nullable(),
		depositMoney: Yup.string()
			.max(7, 'Response must be 7 characters or less')
			.required('Required'),
		signedBy: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.matches(
				/^[a-zA-Z ']+$/,
				'No numbers or symbols are needed for this field.'
			)
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
			desiredLocation: '',
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
			employerAddress: '',
			employerCity: '',
			employerState: '',
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
			evictionStatus: false,
			depositMoney: '',
			signedBy: '',
			signatureDate: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
			// sendEmail();
			console.log(values);
		},
	});

	const personalInformationValidationSchema = Yup.object({
		applicantName: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.matches(
				/^[a-zA-Z ']+$/,
				'No numbers or symbols are needed for this field.'
			)
			.required('Required'),
		applicantPhone: Yup.string()
			.max(10, 'Must be 10 digits.')
			.min(10, 'Must be 10 digits.')
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
			.matches(
				/^[a-zA-Z ']+$/,
				'No numbers or symbols are needed for this field.'
			)
			.required('Required'),
		currentState: Yup.string()
			.max(2, 'Enter two letter state abbreviation.')
			.min(2, 'Enter two letter state abbreviation.')
			.matches(/^[a-zA-Z]+$/, 'Enter two letter state abbreviation.')
			.required('Required'),
		currentZip: Yup.string()
			.max(5, 'Must be five digits.')
			.min(5, 'Must be five digits.')
			.matches(/^\d*$/, 'Enter five digit zip code.')
			.required('Required'),
		desiredLocation: Yup.string()
			.max(50, 'Must be 50 characters or less')
			.required('Required'),
	});

	const formikPersonalInformation = useFormik({
		initialValues: {
			applicantName: '',
			applicantPhone: '',
			applicantDOB: '',
			applicantEmail: '',
			currentAddress: '',
			currentCity: '',
			currentState: '',
			currentZip: '',
			desiredLocation: '',
		},
		validationSchema: personalInformationValidationSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
			console.log(values);
			handleNext();
		},
	});

	const rentalHistoryValidationSchema = Yup.object({
		currentLandlord: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		currentLandlordPhone: Yup.string()
			.max(10, 'Must be 10 digits.')
			.min(10, 'Must be 10 digits.')
			.required('Required'),
		// currentTenure: Yup.number('Please use numbers, not letters.')
		currentTenure: Yup.string()
			.required('Required')
			.max(20, 'Must be 20 characters or less'),
		// .integer('Please use numbers, not letters.')
		// .positive('No negative numbers allowed.')
		// .max(30, 'Please validate this entry.'),
		// .matches(/^\d*$/, 'Please use numbers, not letters.')
		currentReason: Yup.string()
			.max(50, 'Response must be 50 characters or less')
			.required('Required'),
		previousAddress: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		previousCity: Yup.string()
			.max(20, 'Must be 20 characters or less')
			.matches(
				/^[a-zA-Z ']+$/,
				'No numbers or symbols are needed for this field.'
			)
			.required('Required'),
		previousState: Yup.string()
			.max(2, 'Enter two letter state abbreviation.')
			.min(2, 'Enter two letter state abbreviation.')
			.matches(/^[a-zA-Z]+$/, 'Enter two letter state abbreviation.')
			.required('Required'),
		previousZip: Yup.string()
			.max(5, 'Must be five digits.')
			.min(5, 'Must be five digits.')
			.matches(/^\d*$/, 'Enter five digit zip code.')
			.required('Required'),
		previousLandlord: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.matches(
				/^[a-zA-Z ']+$/,
				'No numbers or symbols are needed for this field.'
			)
			.required('Required'),
		previousLandlordPhone: Yup.string()
			.max(10, 'Must be 10 digits.')
			.min(10, 'Must be 10 digits.')
			.required('Required'),
		previousTenure: Yup.string()
			.required('Required')
			.max(20, 'Must be 20 characters or less'),
		previousReason: Yup.string()
			.max(50, 'Response must be 50 characters or less')
			.required('Required'),
	});

	const formikRentalHistory = useFormik({
		initialValues: {
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
		},
		validationSchema: rentalHistoryValidationSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
			console.log(values);
			handleNext();
		},
	});

	const employmentHistoryValidationSchema = Yup.object({
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
			.max(10, 'Must be 10 digits.')
			.min(10, 'Must be 10 digits.')
			.required('Required'),
		employerTenure: Yup.string()
			.required('Required')
			.max(20, 'Must be 20 characters or less'),
		otherIncome: Yup.string()
			.max(7, 'Response must be 7 characters or less')
			.required('Required'),
		employerAddress: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		employerCity: Yup.string()
			.max(20, 'Must be 20 characters or less')
			.matches(
				/^[a-zA-Z ']+$/,
				'No numbers or symbols are needed for this field.'
			)
			.required('Required'),
		employerState: Yup.string()
			.max(2, 'Enter two letter state abbreviation.')
			.min(2, 'Enter two letter state abbreviation.')
			.matches(/^[a-zA-Z]+$/, 'Enter two letter state abbreviation.')
			.required('Required'),
	});

	const formikEmploymentHistory = useFormik({
		initialValues: {
			presentEmployer: '',
			position: '',
			monthlyIncome: '',
			employerPhone: '',
			employerTenure: '',
			otherIncome: '',
			employerAddress: '',
			employerCity: '',
			employerState: '',
		},
		validationSchema: employmentHistoryValidationSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
			console.log(values);
			handleNext();
		},
	});

	const referencesValidationSchema = Yup.object({
		firstReferenceName: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.matches(
				/^[a-zA-Z ']+$/,
				'No numbers or symbols are needed for this field.'
			)
			.required('Required'),
		firstReferenceTenure: Yup.string()
			.required('Required')
			.max(20, 'Must be 20 characters or less'),
		firstReferenceRelationship: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		firstReferencePhone: Yup.string()
			.max(10, 'Must be 10 digits.')
			.min(10, 'Must be 10 digits.')
			.required('Required'),
		secondReferenceName: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.matches(
				/^[a-zA-Z ']+$/,
				'No numbers or symbols are needed for this field.'
			)
			.required('Required'),
		secondReferenceTenure: Yup.string()
			.required('Required')
			.max(20, 'Must be 20 characters or less'),
		secondReferenceRelationship: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		secondReferencePhone: Yup.string()
			.max(10, 'Must be 10 digits.')
			.min(10, 'Must be 10 digits.')
			.required('Required'),
		thirdReferenceName: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.matches(
				/^[a-zA-Z ']+$/,
				'No numbers or symbols are needed for this field.'
			)
			.required('Required'),
		thirdReferenceTenure: Yup.string()
			.required('Required')
			.max(20, 'Must be 20 characters or less'),
		thirdReferenceRelationship: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.required('Required'),
		thirdReferencePhone: Yup.string()
			.max(10, 'Must be 10 digits.')
			.min(10, 'Must be 10 digits.')
			.required('Required'),
		adultsNumber: Yup.number()
			// .max(1, 'Must be one character')
			.positive('Value must be zero or greater.')
			.integer()
			.required('Required'),
		childrenNumber: Yup.number()
			// .max(1, 'Must be one character')
			// .positive()
			.moreThan(-1, 'Value must be zero or greater.')
			.integer()
			.required('Required'),
		// .typeError('Value must be zero or greater.'),
		otherApplicants: Yup.string()
			.max(
				35,
				'Please enter the names of other applicants that need to be added to the lease.'
			)
			.required('Required'),
		evictionStatus: Yup.boolean().required('Required').oneOf([true, false]),
		// .nullable(),
		depositMoney: Yup.string()
			.max(7, 'Response must be 7 characters or less')
			.required('Required'),
	});

	const formikReferences = useFormik({
		initialValues: {
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
			evictionStatus: false,
			depositMoney: '',
		},
		validationSchema: referencesValidationSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
			console.log(values);
			handleNext();
		},
	});

	const signatureValidationSchema = Yup.object({
		signedBy: Yup.string()
			.max(35, 'Must be 35 characters or less')
			.matches(
				/^[a-zA-Z ']+$/,
				'No numbers or symbols are needed for this field.'
			)
			.required('Required'),
		signatureDate: Yup.date()
			// .default(() => new Date())
			.required('Required'),
	});

	const formikSignature = useFormik({
		initialValues: {
			signedBy: '',
			signatureDate: '',
		},
		validationSchema: signatureValidationSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
			console.log(values);
			handleNext();
		},
	});

	//---------------------
	//MUI Stepper Functions
	const steps = [
		'Personal Information',
		'Rental History',
		'Employment History',
		'References',
		'Signature Page',
	];
	const [activeStep, setActiveStep] = React.useState(0);
	const currentStep = useContext(currentStepContext);
	const [skipped, setSkipped] = React.useState(new Set());

	const isStepOptional = (step) => {
		// return step === 1;
		return step === false;
	};

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
		currentStep[1](currentStep[0] + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
		currentStep[1](currentStep[0] - 1);
	};

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<div>
			{/* <Head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head> */}
			{/* <h1 id='pageHeader' className='formLine'>
				Rental Application
			</h1> */}
			<Typography variant='h4' align='center'>
				Rental Application
			</Typography>
			{/* <div>Current Step: {currentStep[0]}</div> */}
			{/* <pre>{JSON.stringify(formik.errors, null, 2)}</pre>
			{formik.errors[0] && <pre>Error Count: {formik.errors[0].length}</pre>} */}
			{/* <pre>{JSON.stringify(formikRentalHistory.errors, null, 2)}</pre>
			{formik.errors[0] && <pre>Error Count: {formik.errors[0].length}</pre>} */}

			{/* <Box id='stepper' sx={{ width: '100%' }}> */}
			<Box id='stepper' sx={{ flexGrow: 1 }}>
				{/* <Stepper activeStep={activeStep}> */}
				<Grid container spacing={2}>
					<Grid item xs={12} md={12}>
						<Stepper activeStep={currentStep[0]}>
							{steps.map((label, index) => {
								const stepProps = {};
								const labelProps = {};
								if (isStepOptional(index)) {
									labelProps.optional = (
										<Typography variant='caption'>Optional</Typography>
									);
								}
								if (isStepSkipped(index)) {
									stepProps.completed = false;
								}
								return (
									<Step key={label} {...stepProps}>
										<StepLabel
											// sx={{ display: { xs: 'none', sm: 'flex' } }}
											{...labelProps}
										>
											{label}
										</StepLabel>
									</Step>
								);
							})}
						</Stepper>
					</Grid>
				</Grid>
			</Box>

			{/* BELOW LINE IS FUNCTIONAL!! */}
			<form id='applicantForm' ref={form} onSubmit={sendEmail}>
				{/* <form id='applicantForm' ref={form} onSubmit={formik.handleSubmit}> */}
				{/* <form id='applicantForm' ref={form} onSubmit={handleSubmit}> */}
				<Box
					sx={{
						flexGrow: 1,
						...(currentStep[0] === 0
							? { display: 'block' }
							: { display: 'none' }),
					}}
				>
					<PersonalInformation formik={formikPersonalInformation} />
				</Box>

				{/* ------------------------ */}
				{/* RENTAL HISTORY SECTION */}
				{/* ------------------------ */}
				<Box
					sx={{
						flexGrow: 1,
						...(currentStep[0] === 1
							? { display: 'block' }
							: { display: 'none' }),
					}}
				>
					<RentalHistory formik={formikRentalHistory} />
				</Box>

				{/* ------------------------ */}
				{/* EMPLOYMENT HISTORY SECTION */}
				{/* ------------------------ */}
				<Box
					sx={{
						flexGrow: 1,
						...(currentStep[0] === 2
							? { display: 'block' }
							: { display: 'none' }),
					}}
				>
					<EmploymentHistory formik={formikEmploymentHistory} />
				</Box>
				{/* ------------------------ */}
				{/* REFERENCES SECTION */}
				{/* ------------------------ */}
				<Box
					sx={{
						flexGrow: 1,
						...(currentStep[0] === 3
							? { display: 'block' }
							: { display: 'none' }),
					}}
				>
					<References formik={formikReferences} />
				</Box>
				{/* ------------------------ */}
				{/* SIGNATURE SECTION */}
				{/* ------------------------ */}
				<Box
					sx={{
						flexGrow: 1,
						...(currentStep[0] === 4
							? { display: 'block' }
							: { display: 'none' }),
					}}
				>
					<Signature formik={formikSignature} />
				</Box>
				{/* ------------------------ */}
				{/* CONFIRMATION SECTION */}
				{/* ------------------------ */}
				<Box
					sx={{
						flexGrow: 1,
						...(currentStep[0] === 5
							? { display: 'block' }
							: { display: 'none' }),
					}}
				>
					<Grid id='completionNotice' container spacing={2}>
						<Grid item xs={12} md={12}>
							<Typography
								variant='subtitle1'
								//  align='center'
							>
								Your application is complete! You will receive a copy of the
								email notification to our management. Thank you for your
								interest in Fair Oak Farms!
							</Typography>
						</Grid>
						{/* <Grid item xs={6} md={7}>
							<ul>
								<li>
									<strong>{formikPersonalInformation.values[0]}</strong>&nbsp;
									{formikPersonalInformation.values.applicantName}
								</li>
								<li>
									<strong>Applicant Phone - </strong>&nbsp;
									{formikPersonalInformation.values.applicantPhone}
								</li>
							</ul>

							{JSON.stringify(formikPersonalInformation.values, null, 2)}
						</Grid> */}
					</Grid>
					{/* <Grid item xs={6} md={12}>
						<Box
							sx={{
								display: 'flex',
								width: '100%',
								justifyContent: 'center',
							}}
						>
							<Button
								variant='contained'
								onClick={() => {
									handleBack();
								}}
							>
								Previous Page
							</Button>
						</Box>
					</Grid> */}
				</Box>

				{/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
				{/* <div>formikPersonalInformation:</div>
				<pre>{JSON.stringify(formikPersonalInformation.values, null, 2)}</pre> */}
				{/* <div>formikRentalHistory:</div>
				<pre>{JSON.stringify(formikRentalHistory.values, null, 2)}</pre> */}
				{/* <div>formikReferences:</div>
				<pre>{JSON.stringify(formikReferences.values, null, 2)}</pre> */}
				{/* <div>formikSignature:</div>
				<pre>{JSON.stringify(formikSignature.values, null, 2)}</pre> */}
			</form>

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

export default RentalApplication;
