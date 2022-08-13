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

	const backgroundColor = 'rgb(240, 248, 255, 0.95)';

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
							sx={{
								backgroundColor: { backgroundColor },
							}}
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
							sx={{
								backgroundColor: { backgroundColor },
							}}
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
							sx={{
								backgroundColor: { backgroundColor },
							}}
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
							sx={{
								backgroundColor: { backgroundColor },
							}}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							id='employerTenure'
							name='employerTenure'
							label='How many years at current job?'
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
							sx={{
								backgroundColor: { backgroundColor },
							}}
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
							sx={{
								backgroundColor: { backgroundColor },
							}}
							// required
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
							sx={{
								backgroundColor: { backgroundColor },
							}}
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
							sx={{
								backgroundColor: { backgroundColor },
							}}
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
							sx={{
								backgroundColor: { backgroundColor },
							}}
							inputProps={{ style: { textTransform: 'uppercase' } }}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<TextField
							fullWidth
							id='employerZip'
							name='employerZip'
							label='Zip'
							required
							value={props.formik.values.employerZip}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.employerZip &&
								Boolean(props.formik.errors.employerZip)
							}
							helperText={
								props.formik.touched.employerZip &&
								props.formik.errors.employerZip
							}
							inputProps={{ format: '#####' }}
							InputProps={{ inputComponent: NumberFormatCustom }}
							InputLabelProps={{
								shrink: props.formik.values.employerZip ? true : false,
							}}
							sx={{
								backgroundColor: { backgroundColor },
							}}
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
