import React, { useContext } from 'react';
import { TextField, Box, Grid, Button, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { currentStepContext } from '../context/currentStepProvider';
import CustomTextField from './CustomTextField';

const Signature = (props) => {
	const currentStep = useContext(currentStepContext);

	//Moves to previous step of application after clicking 'Previous' button.
	const handleBack = () => {
		currentStep[1](currentStep[0] - 1);
	};

	//Opaque background color for form fields.
	const backgroundColor = 'rgb(240, 248, 255, 0.95)';

	return (
		<div>
			<Box sx={{ flexGrow: 1 }}>
				<Typography
					variant='h6'
					className='stepHeader'
					sx={{ marginBottom: '1rem' }}
				>
					Signature Page
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} md={12}>
						<Typography variant='subtitle1'>
							I CERTIFY that answers given herein are true and complete to the
							best of my knowledge. I authorize investigation of all statements
							contained in this application for tenant screening as may be
							necessary in arriving at a tenant decision. I understand that the
							landlord may terminate any rental agreement entered into for any
							misrepresentations made above.
						</Typography>
					</Grid>
					<Grid item xs={12} md={4}>
						<CustomTextField
							id='signedBy'
							label='Signature'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								fullWidth
								id='signatureDate'
								// name='signatureDate'
								label='Signature Date'
								type='date'
								minDate={new Date()}
								required
								value={props.formik.values.signatureDate || null}
								onChange={(value) => {
									if (value !== null) {
										props.formik.setFieldValue(
											'signatureDate',
											value
												.toString()
												.slice(4, 11)
												.concat(value.toString().slice(13, 15))
										);
									}
								}}
								onBlur={props.formik.handleBlur}
								error={
									props.formik.touched.signatureDate &&
									Boolean(props.formik.errors.signatureDate)
								}
								helperText={
									props.formik.touched.signatureDate &&
									props.formik.errors.signatureDate
								}
								renderInput={(params) => (
									<TextField
										{...params}
										name='signatureDate'
										fullWidth
										onBlur={props.formik.handleBlur}
										error={
											props.formik.touched.signatureDate &&
											Boolean(props.formik.errors.signatureDate)
										}
										helperText={
											props.formik.touched.signatureDate &&
											props.formik.errors.signatureDate
										}
										sx={{
											backgroundColor: { backgroundColor },
										}}
									/>
								)}
							/>
						</LocalizationProvider>
					</Grid>
					<Grid item xs={12} md={12}>
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
									handleBack();
								}}
								required
							>
								Previous Page
							</Button>

							<Button
								id='submitButton'
								variant='outlined'
								type='submit'
								required
								disabled={!(props.formik.isValid & props.formik.dirty)}
								sx={{
									backgroundColor: 'white',
								}}
							>
								Submit Application
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
};

export default Signature;
