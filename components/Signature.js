import React, { useState, useReducer, useRef, useContext } from 'react';

import { useFormik, withFormik, Formik, getIn, FastField, Form } from 'formik';

import * as Yup from 'yup';
import {
	Alert,
	TextField,
	Radio,
	RadioGroup,
	FormLabel,
	FormControlLabel,
	Box,
	Grid,
	Button,
	Snackbar,
	InputAdornment,
	Typography,
} from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import emailjs from '@emailjs/browser';
import { currentStepContext } from '../context/currentStepProvider';
// import '../styles/globals.css';

const Signature = (props) => {
	const currentStep = useContext(currentStepContext);

	const handleNext = () => {
		currentStep[1](currentStep[0] + 1);
	};
	const handleBack = () => {
		currentStep[1](currentStep[0] - 1);
	};

	return (
		<div>
			<Box sx={{ flexGrow: 1 }}>
				<Typography variant='h6' className='stepHeader'>
					Signature Page
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} md={12}>
						I CERTIFY that answers given herein are true and complete to the
						best of my knowledge. I authorize investigation of all statements
						contained in this application for tenant screening as may be
						necessary in arriving at a tenant decision. I understand that the
						landlord may terminate any rental agreement entered into for any
						misrepresentations made above.
					</Grid>
					<Grid item xs={12} md={4}>
						<TextField
							id='signedBy'
							name='signedBy'
							label='Signature'
							required
							value={props.formik.values.signedBy}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.signedBy &&
								Boolean(props.formik.errors.signedBy)
							}
							helperText={
								props.formik.touched.signedBy && props.formik.errors.signedBy
							}
							fullWidth
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
								// inputFormat='MM/dd/yyyy'
								// minDate={new Date()}
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
