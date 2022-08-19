import React, { useContext } from 'react';
import {
	TextField,
	Button,
	Box,
	Grid,
	FormLabel,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
	MenuItem,
} from '@mui/material';
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

const References = (props) => {
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
					References / Other
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} md={12}>
						<CustomTextField
							id='firstReferenceName'
							label='Reference #1 Name'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<CustomTextField
							id='firstReferenceTenure'
							label='Years Known'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<CustomTextField
							id='firstReferenceRelationship'
							label='Relationship'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<CustomPhoneField
							id='firstReferencePhone'
							label='Phone Number'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={12}>
						<CustomTextField
							id='secondReferenceName'
							label='Reference #2 Name'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<CustomTextField
							id='secondReferenceTenure'
							label='Years Known'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<CustomTextField
							id='secondReferenceRelationship'
							label='Relationship'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<CustomPhoneField
							id='secondReferencePhone'
							label='Phone Number'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={12}>
						<CustomTextField
							id='thirdReferenceName'
							label='Reference #3 Name'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<CustomTextField
							id='thirdReferenceTenure'
							label='Years Known'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<CustomTextField
							id='thirdReferenceRelationship'
							label='Relationship'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<CustomPhoneField
							id='thirdReferencePhone'
							label='Phone Number'
							formik={props.formik}
							mandatory='true'
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							id='adultsNumber'
							name='adultsNumber'
							label='Total Number of Adults'
							inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
							select
							value={props.formik.values.adultsNumber}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.adultsNumber &&
								Boolean(props.formik.errors.adultsNumber)
							}
							helperText={
								props.formik.touched.adultsNumber &&
								props.formik.errors.adultsNumber
							}
							sx={{
								backgroundColor: { backgroundColor },
							}}
							required
							fullWidth
						>
							<MenuItem key={1} value='1'>
								1
							</MenuItem>
							<MenuItem key={2} value='2'>
								2
							</MenuItem>
							<MenuItem key={3} value='3'>
								3
							</MenuItem>
							<MenuItem key={4} value='4'>
								4
							</MenuItem>
							<MenuItem key={5} value='5'>
								5
							</MenuItem>
						</TextField>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							id='childrenNumber'
							name='childrenNumber'
							label='Total Number of Children Under Age 18'
							inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
							select
							value={props.formik.values.childrenNumber}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.childrenNumber &&
								Boolean(props.formik.errors.childrenNumber)
							}
							helperText={
								props.formik.touched.childrenNumber &&
								props.formik.errors.childrenNumber
							}
							sx={{
								backgroundColor: { backgroundColor },
							}}
							required
							fullWidth
						>
							<MenuItem key={0} value='0'>
								0
							</MenuItem>
							<MenuItem key={1} value='1'>
								1
							</MenuItem>
							<MenuItem key={2} value='2'>
								2
							</MenuItem>
							<MenuItem key={3} value='3'>
								3
							</MenuItem>
							<MenuItem key={4} value='4'>
								4
							</MenuItem>
							<MenuItem key={5} value='5'>
								5
							</MenuItem>
						</TextField>
					</Grid>
					<Grid item xs={12} md={12}>
						<CustomTextField
							id='otherApplicants'
							label='Names of Other Applicants'
							formik={props.formik}
							mandatory='false'
						/>
					</Grid>
					<Grid item xs={12} md={5}>
						<TextField
							id='depositMoney'
							name='depositMoney'
							label='Money for deposit?'
							value={props.formik.values.depositMoney}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.depositMoney &&
								Boolean(props.formik.errors.depositMoney)
							}
							helperText={
								props.formik.touched.depositMoney &&
								props.formik.errors.depositMoney
							}
							inputProps={{ format: '$####' }}
							InputProps={{
								inputComponent: NumberFormatCustom,
							}}
							sx={{
								backgroundColor: { backgroundColor },
							}}
							required
							fullWidth
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
					<Grid item xs={12} md={12}>
						<Box
							id='evictionContainer'
							sx={{ display: 'flex', alignItems: 'center' }}
						>
							<FormLabel id='evictionRadioButtons'>
								Have you ever been party to an eviction?
							</FormLabel>
							<RadioGroup
								row
								// aria-labelledby='evictionRadioButtons'
								name='evictionStatus'
								value={props.formik.values.evictionStatus}
								onChange={props.formik.handleChange}
								onBlur={props.formik.handleBlur}
							>
								<Box id='evictionButtonContainer'>
									<FormControlLabel
										value='true'
										control={<Radio />}
										label='Yes'
									/>
									<FormControlLabel
										value='false'
										control={<Radio />}
										label='No'
									/>
								</Box>
							</RadioGroup>
						</Box>
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

export default References;
