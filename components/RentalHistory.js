import React, { useContext } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
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
		/>
	);
}

const RentalHistory = (props) => {
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
					Rental History
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<TextField
							id='currentLandlord'
							name='currentLandlord'
							label="Current Landlord's Name"
							value={props.formik.values.currentLandlord}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.currentLandlord &&
								Boolean(props.formik.errors.currentLandlord)
							}
							helperText={
								props.formik.touched.currentLandlord &&
								props.formik.errors.currentLandlord
							}
							fullWidth
							required
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							id='currentLandlordPhone'
							name='currentLandlordPhone'
							label="Current Landlord's Phone"
							value={props.formik.values.currentLandlordPhone}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.currentLandlordPhone &&
								Boolean(props.formik.errors.currentLandlordPhone)
							}
							helperText={
								props.formik.touched.currentLandlordPhone &&
								props.formik.errors.currentLandlordPhone
							}
							inputProps={{ format: '(###) ###-####' }}
							InputProps={{ inputComponent: NumberFormatCustom }}
							InputLabelProps={{
								shrink: props.formik.values.currentLandlordPhone ? true : false,
							}}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							id='currentTenure'
							name='currentTenure'
							label='How many years at this address?'
							value={props.formik.values.currentTenure}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.currentTenure &&
								Boolean(props.formik.errors.currentTenure)
							}
							helperText={
								props.formik.touched.currentTenure &&
								props.formik.errors.currentTenure
							}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							id='currentReason'
							name='currentReason'
							label='Reason for leaving?'
							value={props.formik.values.currentReason}
							onChange={props.formik.handleChange}
							// onChange={() => {
							// 	startTransition(() => {
							// 		props.formik.handleChange;
							// 	});
							// }}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.currentReason &&
								Boolean(props.formik.errors.currentReason)
							}
							helperText={
								props.formik.touched.currentReason &&
								props.formik.errors.currentReason
							}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={12}>
						<TextField
							id='previousAddress'
							name='previousAddress'
							label='Previous Address'
							value={props.formik.values.previousAddress}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.previousAddress &&
								Boolean(props.formik.errors.previousAddress)
							}
							helperText={
								props.formik.touched.previousAddress &&
								props.formik.errors.previousAddress
							}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							id='previousCity'
							name='previousCity'
							label='City'
							value={props.formik.values.previousCity}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.previousCity &&
								Boolean(props.formik.errors.previousCity)
							}
							helperText={
								props.formik.touched.previousCity &&
								props.formik.errors.previousCity
							}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<TextField
							id='previousState'
							name='previousState'
							label='State'
							pattern='[A-Z]{2}'
							value={props.formik.values.previousState}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.previousState &&
								Boolean(props.formik.errors.previousState)
							}
							helperText={
								props.formik.touched.previousState &&
								props.formik.errors.previousState
							}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<TextField
							id='previousZip'
							name='previousZip'
							label='Zip'
							value={props.formik.values.previousZip}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.previousZip &&
								Boolean(props.formik.errors.previousZip)
							}
							helperText={
								props.formik.touched.previousZip &&
								props.formik.errors.previousZip
							}
							inputProps={{ format: '#####' }}
							InputProps={{ inputComponent: NumberFormatCustom }}
							InputLabelProps={{
								shrink: props.formik.values.previousZip ? true : false,
							}}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							id='previousLandlord'
							name='previousLandlord'
							label="Previous Landlord's Name"
							value={props.formik.values.previousLandlord}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.previousLandlord &&
								Boolean(props.formik.errors.previousLandlord)
							}
							helperText={
								props.formik.touched.previousLandlord &&
								props.formik.errors.previousLandlord
							}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							id='previousLandlordPhone'
							name='previousLandlordPhone'
							label="Previous Landlord's Phone"
							value={props.formik.values.previousLandlordPhone}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.previousLandlordPhone &&
								Boolean(props.formik.errors.previousLandlordPhone)
							}
							helperText={
								props.formik.touched.previousLandlordPhone &&
								props.formik.errors.previousLandlordPhone
							}
							inputProps={{ format: '(###) ###-####' }}
							InputProps={{ inputComponent: NumberFormatCustom }}
							InputLabelProps={{
								shrink: props.formik.values.previousLandlordPhone
									? true
									: false,
							}}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							id='previousTenure'
							name='previousTenure'
							label='How many years at this address?'
							value={props.formik.values.previousTenure}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.previousTenure &&
								Boolean(props.formik.errors.previousTenure)
							}
							helperText={
								props.formik.touched.previousTenure &&
								props.formik.errors.previousTenure
							}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							id='previousReason'
							name='previousReason'
							label='Reason for leaving?'
							value={props.formik.values.previousReason}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.previousReason &&
								Boolean(props.formik.errors.previousReason)
							}
							helperText={
								props.formik.touched.previousReason &&
								props.formik.errors.previousReason
							}
							required
							fullWidth
						/>
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
							>
								Previous Page
							</Button>
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

export default RentalHistory;
