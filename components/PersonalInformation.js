import React, { useContext } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import NumberFormat from 'react-number-format';
import { currentStepContext } from '../context/currentStepProvider';

import CustomTextField from './CustomTextField';
import CustomEmailField from './CustomEmailField';
import CustomPhoneField from './CustomPhoneField';

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
	props,
	ref
) {
	const { onChange, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={ref}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			}}
		/>
	);
});

const PersonalInformation = (props) => {
	const currentStep = useContext(currentStepContext);

	const handleNext = () => {
		currentStep[1](currentStep[0] + 1);
	};

	const backgroundColor = 'rgb(240, 248, 255, 0.95)';

	return (
		<div id='informationPageContainer'>
			<Box sx={{ flexGrow: 1 }}>
				<Typography
					variant='h6'
					className='stepHeader'
					sx={{ marginBottom: '1rem' }}
				>
					Personal Information
				</Typography>

				<Grid container spacing={2}>
					<Grid item xs={12} md={7}>
						<CustomTextField
							id='applicantName'
							label='Applicant Name'
							formik={props.formik}
							mandatory='true'
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
								maxDate={new Date()}
								required
								value={props.formik.values.applicantDOB || null}
								onChange={(value) => {
									if (value !== null) {
										props.formik.setFieldValue(
											'applicantDOB',
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
										onBlur={props.formik.handleBlur}
										error={
											props.formik.touched.applicantDOB &&
											Boolean(props.formik.errors.applicantDOB)
										}
										helperText={
											props.formik.touched.applicantDOB &&
											props.formik.errors.applicantDOB
										}
										sx={{
											backgroundColor: { backgroundColor },
										}}
									/>
								)}
							/>
						</LocalizationProvider>
					</Grid>
					<Grid item xs={12} md={6}>
						<CustomPhoneField
							id='applicantPhone'
							label='Applicant Phone Number'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<CustomEmailField
							id='applicantEmail'
							label='Applicant Email'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={12}>
						<CustomTextField
							id='currentAddress'
							label='Current Address'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<CustomTextField
							id='currentCity'
							label='City'
							formik={props.formik}
							mandatory='true'
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
							sx={{
								backgroundColor: { backgroundColor },
							}}
							// inputProps={{ style: { textTransform: 'uppercase' } }}
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
							sx={{
								backgroundColor: { backgroundColor },
							}}
						/>
					</Grid>
					<Grid item xs={12} md={12}>
						<CustomTextField
							id='desiredLocation'
							label='Location Applying For?'
							formik={props.formik}
							mandatory='true'
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
