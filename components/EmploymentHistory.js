import React, { useContext } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import NumberFormat from 'react-number-format';

import { currentStepContext } from '../context/currentStepProvider';
import CustomTextField from './CustomTextField';
import CustomPhoneField from './CustomPhoneField';

//Facilitates the use of custom number formats in certain fields.  forwardRef needed to comply with MUI V5 migration.  https://mui.com/pt/material-ui/migration/v5-component-changes/#forward-ref-instead-of-inputref-prop
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

const EmploymentHistory = (props) => {
	const currentStep = useContext(currentStepContext);

	//Moves to next step of application after clicking 'Next' button.
	const handleNext = () => {
		currentStep[1](currentStep[0] + 1);
	};

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
					Employment History
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} md={12}>
						<CustomTextField
							id='presentEmployer'
							label='Present Employer'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<CustomTextField
							id='position'
							label='Position'
							formik={props.formik}
							mandatory='true'
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
					</Grid>
					<Grid item xs={12} md={6}>
						<CustomPhoneField
							id='employerPhone'
							label='Employer Phone Number'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<CustomTextField
							id='employerTenure'
							label='How many years at current job?'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={12}>
						<CustomTextField
							id='otherIncome'
							label='Other Income Sources?'
							formik={props.formik}
							mandatory='false'
						/>
					</Grid>
					<Grid item xs={12} md={12}>
						<CustomTextField
							id='employerAddress'
							label='Employers Address'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<CustomTextField
							id='employerCity'
							label='City'
							formik={props.formik}
							mandatory='true'
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
