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

const EmploymentHistory = (props) => {
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
					Employment History
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} md={12}>
						<TextField
							id='presentEmployer'
							name='presentEmployer'
							label='Present Employer'
							value={props.formik.values.presentEmployer}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.presentEmployer &&
								Boolean(props.formik.errors.presentEmployer)
							}
							helperText={
								props.formik.touched.presentEmployer &&
								props.formik.errors.presentEmployer
							}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							id='position'
							name='position'
							label='Position'
							value={props.formik.values.position}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.position &&
								Boolean(props.formik.errors.position)
							}
							helperText={
								props.formik.touched.position && props.formik.errors.position
							}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							id='monthlyIncome'
							name='monthlyIncome'
							label='Monthly Income'
							inputProps={{ format: '$####' }}
							InputProps={{
								inputComponent: NumberFormatCustom,
							}}
							InputLabelProps={{
								shrink: props.formik.values.monthlyIncome ? true : false,
							}}
							value={props.formik.values.monthlyIncome}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.monthlyIncome &&
								Boolean(props.formik.errors.monthlyIncome)
							}
							helperText={
								props.formik.touched.monthlyIncome &&
								props.formik.errors.monthlyIncome
							}
							required
							fullWidth
						/>

						{/* -----------------=------------------------- */}
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							id='employerPhone'
							name='employerPhone'
							label='Employer Phone Number'
							value={props.formik.values.employerPhone}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.employerPhone &&
								Boolean(props.formik.errors.employerPhone)
							}
							helperText={
								props.formik.touched.employerPhone &&
								props.formik.errors.employerPhone
							}
							inputProps={{ format: '(###) ###-####' }}
							InputProps={{ inputComponent: NumberFormatCustom }}
							InputLabelProps={{
								shrink: props.formik.values.employerPhone ? true : false,
							}}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							id='employerTenure'
							name='employerTenure'
							label='How long at current job?'
							value={props.formik.values.employerTenure}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.employerTenure &&
								Boolean(props.formik.errors.employerTenure)
							}
							helperText={
								props.formik.touched.employerTenure &&
								props.formik.errors.employerTenure
							}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={12}>
						<TextField
							id='otherIncome'
							name='otherIncome'
							label='Other Income Sources?'
							value={props.formik.values.otherIncome}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.otherIncome &&
								Boolean(props.formik.errors.otherIncome)
							}
							helperText={
								props.formik.touched.otherIncome &&
								props.formik.errors.otherIncome
							}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={12}>
						<TextField
							id='employerAddress'
							name='employerAddress'
							label='Employers Address'
							value={props.formik.values.employerAddress}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.employerAddress &&
								Boolean(props.formik.errors.employerAddress)
							}
							helperText={
								props.formik.touched.employerAddress &&
								props.formik.errors.employerAddress
							}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							id='employerCity'
							name='employerCity'
							label='City'
							value={props.formik.values.employerCity}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.employerCity &&
								Boolean(props.formik.errors.employerCity)
							}
							helperText={
								props.formik.touched.employerCity &&
								props.formik.errors.employerCity
							}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<TextField
							id='employerState'
							name='employerState'
							label='State'
							pattern='[A-Z]{2}'
							value={props.formik.values.employerState}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.employerState &&
								Boolean(props.formik.errors.employerState)
							}
							helperText={
								props.formik.touched.employerState &&
								props.formik.errors.employerState
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

export default EmploymentHistory;
