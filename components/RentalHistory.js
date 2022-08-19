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

const RentalHistory = (props) => {
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
					Rental History
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<CustomTextField
							id='currentLandlord'
							label="Current Landlord's Name"
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<CustomPhoneField
							id='currentLandlordPhone'
							label="Current Landlord's Phone"
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<CustomTextField
							id='currentTenure'
							label='How many years at this address?'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<CustomTextField
							id='currentReason'
							label='Reason for leaving?'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={12}>
						<CustomTextField
							id='previousAddress'
							label='Previous Address'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<CustomTextField
							id='previousCity'
							label='City'
							formik={props.formik}
							mandatory='true'
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
							sx={{
								backgroundColor: { backgroundColor },
							}}
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
							sx={{
								backgroundColor: { backgroundColor },
							}}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<CustomTextField
							id='previousLandlord'
							label="Previous Landlord's Name"
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<CustomPhoneField
							id='previousLandlordPhone'
							label="Previous Landlord's Phone"
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<CustomTextField
							id='previousTenure'
							label='How many years at this address?'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<CustomTextField
							id='previousReason'
							label='Reason for leaving?'
							formik={props.formik}
							mandatory='true'
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
