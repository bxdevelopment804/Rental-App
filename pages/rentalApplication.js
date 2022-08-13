import React, { useState, useRef, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useFormik, resetForm } from 'formik';
// import * as Yup from 'yup';
import {
	Alert,
	Box,
	Button,
	Grid,
	Snackbar,
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

import { currentStepContext } from '../context/currentStepProvider';
import personalInformationValidationSchema from '../validations/personalInformationSchema';
import rentalHistoryValidationSchema from '../validations/rentalHistorySchema';
import employmentHistoryValidationSchema from '../validations/employmentHistorySchema';
import referencesValidationSchema from '../validations/referencesSchema';
import signatureValidationSchema from '../validations/signatureSchema';

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

	// function handleSubmit() {
	// 	console.log('Form Submitted');
	// 	formik.handleSubmit();
	// 	<Alert severity='success'>This is a success alert — check it out!</Alert>;
	// }

	//-------------------------
	//EmailJs Related Functions
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

		currentStep[1](currentStep[0] + 1);

		handleClick();
	};

	//-------------------------
	//Formik Default Values
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
			employerZip: '',
		},
		validationSchema: employmentHistoryValidationSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
			console.log(values);
			handleNext();
		},
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

	// const handleBack = () => {
	// 	setActiveStep((prevActiveStep) => prevActiveStep - 1);
	// 	currentStep[1](currentStep[0] - 1);
	// };

	// const handleSkip = () => {
	// 	if (!isStepOptional(activeStep)) {
	// 		// You probably want to guard against something like this,
	// 		// it should never occur unless someone's actively trying to break something.
	// 		throw new Error("You can't skip a step that isn't optional.");
	// 	}

	// 	setActiveStep((prevActiveStep) => prevActiveStep + 1);
	// 	setSkipped((prevSkipped) => {
	// 		const newSkipped = new Set(prevSkipped.values());
	// 		newSkipped.add(activeStep);
	// 		return newSkipped;
	// 	});
	// };

	// const handleReset = () => {
	// 	setActiveStep(0);
	// };

	const returnHome = () => {
		currentStep[1](0);
		formikPersonalInformation.resetForm();
		formikRentalHistory.resetForm();
		formikEmploymentHistory.resetForm();
		formikReferences.resetForm();
		formikSignature.resetForm();
	};

	return (
		<div id='applicationPageContainer'>
			<Typography variant='h4' align='center'>
				Rental Application
			</Typography>
			<Box id='backgroundContrast'></Box>
			<Box>
				<Image
					id='backgroundImage'
					src='https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1600'
					layout='fill'
				/>
			</Box>

			<Box id='stepper' sx={{ flexGrow: 0 }}>
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
										<StepLabel {...labelProps}>{label}</StepLabel>
									</Step>
								);
							})}
						</Stepper>
					</Grid>
				</Grid>
			</Box>

			<form id='applicantForm' ref={form} onSubmit={sendEmail}>
				<Box
					id='personalInformationContainer'
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
							<Typography variant='h6'>
								Your application is complete! You will receive a copy of the
								email notification to our management. Thank you for your
								interest in Fair Oak Farms!
							</Typography>
						</Grid>
						<Grid item xs={12} md={12}>
							<Box sx={{ display: 'flex', justifyContent: 'center' }}>
								<Link href='/' exact>
									<Button
										variant='contained'
										onClick={() => {
											returnHome();
										}}
									>
										Return Home
									</Button>
								</Link>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</form>

			<Snackbar
				open={toastOpen}
				autoHideDuration={6000}
				onClose={handleClose}
				message='Application Submitted!'
			/>
			<Box id='applicationPageFooter'>
				<Typography variant='subtitle2'>
					Created by{' '}
					<strong>
						<i>BX Development</i>
					</strong>
				</Typography>
			</Box>
		</div>
	);
};

export default RentalApplication;
