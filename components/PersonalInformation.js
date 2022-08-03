import React, { useContext } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import NumberFormat from 'react-number-format';
import { currentStepContext } from '../context/currentStepProvider';

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

const PersonalInformation = (props) => {
	const currentStep = useContext(currentStepContext);

	const handleNext = () => {
		currentStep[1](currentStep[0] + 1);
	};
	return (
		<div>
			<Box sx={{ flexGrow: 1 }}>
				<Typography variant='h6' className='stepHeader'>
					Personal Information
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} md={7}>
						<TextField
							fullWidth
							id='applicantName'
							name='applicantName'
							label='Applicant Name'
							required
							value={props.formik.values.applicantName}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.applicantName &&
								Boolean(props.formik.errors.applicantName)
							}
							helperText={
								props.formik.touched.applicantName &&
								props.formik.errors.applicantName
							}
						/>
					</Grid>
					<Grid item xs={12} md={5}>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								fullWidth
								id='applicantDOB'
								// name='applicantDOB'
								label='Applicant Birth Date'
								type='date'
								required
								value={props.formik.values.applicantDOB || null}
								onChange={(value) => {
									if (value !== null) {
										props.formik.setFieldValue(
											'applicantDOB',
											// value.toString().slice(4, 15)
											value
												.toString()
												.slice(4, 11)
												.concat(value.toString().slice(13, 15))
										);
									}
								}}
								onBlur={props.formik.handleBlur}
								error={
									props.formik.touched.applicantDOB &&
									Boolean(props.formik.errors.applicantDOB)
								}
								helperText={
									props.formik.touched.applicantDOB &&
									props.formik.errors.applicantDOB
								}
								renderInput={(params) => (
									<TextField
										{...params}
										fullWidth
										value={props.formik.values.applicantDOB || null}
										name='applicantDOB'
										// error={props.formik.errors.applicantDOB}
										onBlur={props.formik.handleBlur}
										error={
											props.formik.touched.applicantDOB &&
											Boolean(props.formik.errors.applicantDOB)
										}
										helperText={
											props.formik.touched.applicantDOB &&
											props.formik.errors.applicantDOB
										}
									/>
								)}
							/>
						</LocalizationProvider>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							id='applicantPhone'
							name='applicantPhone'
							label='Applicant Phone Number'
							required
							value={props.formik.values.applicantPhone}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.applicantPhone &&
								Boolean(props.formik.errors.applicantPhone)
							}
							helperText={
								props.formik.touched.applicantPhone &&
								props.formik.errors.applicantPhone
							}
							inputProps={{ format: '(###) ###-####' }}
							InputProps={{ inputComponent: NumberFormatCustom }}
							InputLabelProps={{
								shrink: props.formik.values.applicantPhone ? true : false,
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							id='applicantEmail'
							name='applicantEmail'
							label='Applicant Email'
							required
							type='email'
							value={props.formik.values.applicantEmail}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.applicantEmail &&
								Boolean(props.formik.errors.applicantEmail)
							}
							helperText={
								props.formik.touched.applicantEmail &&
								props.formik.errors.applicantEmail
							}
						/>
					</Grid>
					<Grid item xs={12} md={12}>
						<TextField
							fullWidth
							id='currentAddress'
							name='currentAddress'
							label='Current Address'
							required
							value={props.formik.values.currentAddress}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.currentAddress &&
								Boolean(props.formik.errors.currentAddress)
							}
							helperText={
								props.formik.touched.currentAddress &&
								props.formik.errors.currentAddress
							}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							id='currentCity'
							name='currentCity'
							label='City'
							required
							value={props.formik.values.currentCity}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.currentCity &&
								Boolean(props.formik.errors.currentCity)
							}
							helperText={
								props.formik.touched.currentCity &&
								props.formik.errors.currentCity
							}
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<TextField
							fullWidth
							id='currentState'
							name='currentState'
							label='State'
							pattern='[A-Z]{2}'
							required
							value={props.formik.values.currentState}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.currentState &&
								Boolean(props.formik.errors.currentState)
							}
							helperText={
								props.formik.touched.currentState &&
								props.formik.errors.currentState
							}
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<TextField
							fullWidth
							id='currentZip'
							name='currentZip'
							label='Zip'
							required
							value={props.formik.values.currentZip}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.currentZip &&
								Boolean(props.formik.errors.currentZip)
							}
							helperText={
								props.formik.touched.currentZip &&
								props.formik.errors.currentZip
							}
							inputProps={{ format: '#####' }}
							InputProps={{ inputComponent: NumberFormatCustom }}
							InputLabelProps={{
								shrink: props.formik.values.currentZip ? true : false,
							}}
						/>
					</Grid>
					<Grid item xs={12} md={12}>
						<TextField
							fullWidth
							id='desiredLocation'
							name='desiredLocation'
							label='Location Applying For?'
							required
							value={props.formik.values.desiredLocation}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.desiredLocation &&
								Boolean(props.formik.errors.desiredLocation)
							}
							helperText={
								props.formik.touched.desiredLocation &&
								props.formik.errors.desiredLocation
							}
							// inputProps={{ format: '#####' }}
							// InputProps={{ inputComponent: NumberFormatCustom }}
							// InputLabelProps={{
							// 	shrink: props.formik.values.currentZip ? true : false,
							// }}
						/>
					</Grid>
					<Grid item xs={12} md={12}>
						<Box sx={{ display: 'flex', justifyContent: 'center' }}>
							<Button
								disabled={!(props.formik.isValid & props.formik.dirty)}
								variant='contained'
								onClick={() => {
									handleNext();
								}}
							>
								Next Page
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
};

export default PersonalInformation;
