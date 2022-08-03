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
} from '@mui/material';
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

const References = (props) => {
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
					References / Other
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} md={12}>
						<TextField
							id='firstReferenceName'
							name='firstReferenceName'
							label='Reference #1 Name'
							value={props.formik.values.firstReferenceName}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.firstReferenceName &&
								Boolean(props.formik.errors.firstReferenceName)
							}
							helperText={
								props.formik.touched.firstReferenceName &&
								props.formik.errors.firstReferenceName
							}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<TextField
							id='firstReferenceTenure'
							name='firstReferenceTenure'
							label='Years Known'
							value={props.formik.values.firstReferenceTenure}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.firstReferenceTenure &&
								Boolean(props.formik.errors.firstReferenceTenure)
							}
							helperText={
								props.formik.touched.firstReferenceTenure &&
								props.formik.errors.firstReferenceTenure
							}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<TextField
							id='firstReferenceRelationship'
							name='firstReferenceRelationship'
							label='Relationship'
							value={props.formik.values.firstReferenceRelationship}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.firstReferenceRelationship &&
								Boolean(props.formik.errors.firstReferenceRelationship)
							}
							helperText={
								props.formik.touched.firstReferenceRelationship &&
								props.formik.errors.firstReferenceRelationship
							}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<TextField
							id='firstReferencePhone'
							name='firstReferencePhone'
							label='Phone Number'
							value={props.formik.values.firstReferencePhone}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.firstReferencePhone &&
								Boolean(props.formik.errors.firstReferencePhone)
							}
							helperText={
								props.formik.touched.firstReferencePhone &&
								props.formik.errors.firstReferencePhone
							}
							inputProps={{ format: '(###) ###-####' }}
							InputProps={{ inputComponent: NumberFormatCustom }}
							InputLabelProps={{
								shrink: props.formik.values.firstReferencePhone ? true : false,
							}}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={12}>
						<TextField
							id='secondReferenceName'
							name='secondReferenceName'
							label='Reference #2 Name'
							value={props.formik.values.secondReferenceName}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.secondReferenceName &&
								Boolean(props.formik.errors.secondReferenceName)
							}
							helperText={
								props.formik.touched.secondReferenceName &&
								props.formik.errors.secondReferenceName
							}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<TextField
							id='secondReferenceTenure'
							name='secondReferenceTenure'
							label='Years Known'
							value={props.formik.values.secondReferenceTenure}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.secondReferenceTenure &&
								Boolean(props.formik.errors.secondReferenceTenure)
							}
							helperText={
								props.formik.touched.secondReferenceTenure &&
								props.formik.errors.secondReferenceTenure
							}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<TextField
							id='secondReferenceRelationship'
							name='secondReferenceRelationship'
							label='Relationship'
							value={props.formik.values.secondReferenceRelationship}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.secondReferenceRelationship &&
								Boolean(props.formik.errors.secondReferenceRelationship)
							}
							helperText={
								props.formik.touched.secondReferenceRelationship &&
								props.formik.errors.secondReferenceRelationship
							}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<TextField
							id='secondReferencePhone'
							name='secondReferencePhone'
							label='Phone Number'
							value={props.formik.values.secondReferencePhone}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.secondReferencePhone &&
								Boolean(props.formik.errors.secondReferencePhone)
							}
							helperText={
								props.formik.touched.secondReferencePhone &&
								props.formik.errors.secondReferencePhone
							}
							inputProps={{ format: '(###) ###-####' }}
							InputProps={{ inputComponent: NumberFormatCustom }}
							InputLabelProps={{
								shrink: props.formik.values.secondReferencePhone ? true : false,
							}}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={12}>
						<TextField
							id='thirdReferenceName'
							name='thirdReferenceName'
							label='Reference #3 Name'
							value={props.formik.values.thirdReferenceName}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.thirdReferenceName &&
								Boolean(props.formik.errors.thirdReferenceName)
							}
							helperText={
								props.formik.touched.thirdReferenceName &&
								props.formik.errors.thirdReferenceName
							}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<TextField
							id='thirdReferenceTenure'
							name='thirdReferenceTenure'
							label='Years Known'
							value={props.formik.values.thirdReferenceTenure}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.thirdReferenceTenure &&
								Boolean(props.formik.errors.thirdReferenceTenure)
							}
							helperText={
								props.formik.touched.thirdReferenceTenure &&
								props.formik.errors.thirdReferenceTenure
							}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<TextField
							id='thirdReferenceRelationship'
							name='thirdReferenceRelationship'
							label='Relationship'
							value={props.formik.values.thirdReferenceRelationship}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.thirdReferenceRelationship &&
								Boolean(props.formik.errors.thirdReferenceRelationship)
							}
							helperText={
								props.formik.touched.thirdReferenceRelationship &&
								props.formik.errors.thirdReferenceRelationship
							}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<TextField
							id='thirdReferencePhone'
							name='thirdReferencePhone'
							label='Phone Number'
							value={props.formik.values.thirdReferencePhone}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.thirdReferencePhone &&
								Boolean(props.formik.errors.thirdReferencePhone)
							}
							helperText={
								props.formik.touched.thirdReferencePhone &&
								props.formik.errors.thirdReferencePhone
							}
							inputProps={{ format: '(###) ###-####' }}
							InputProps={{ inputComponent: NumberFormatCustom }}
							InputLabelProps={{
								shrink: props.formik.values.thirdReferencePhone ? true : false,
							}}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							// autoWidth
							id='adultsNumber'
							name='adultsNumber'
							label='Total Number of Adults'
							inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
							type='number'
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
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							// autoWidth
							id='childrenNumber'
							name='childrenNumber'
							label='Total Number of Children Under Age 18'
							inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
							type='number'
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
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={12}>
						<TextField
							id='otherApplicants'
							name='otherApplicants'
							label='Names of Other Applicants'
							value={props.formik.values.otherApplicants}
							onChange={props.formik.handleChange}
							onBlur={props.formik.handleBlur}
							error={
								props.formik.touched.otherApplicants &&
								Boolean(props.formik.errors.otherApplicants)
							}
							helperText={
								props.formik.touched.applicantDOB &&
								props.formik.errors.otherApplicants
							}
							required
							fullWidth
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
							required
							fullWidth
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
					<Grid item xs={12} md={12}>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<FormLabel id='evictionRadioButtons'>
								Have you ever been party to an eviction?
							</FormLabel>
							<RadioGroup
								row
								aria-labelledby='evictionRadioButtons'
								// id='evictionRadioButtons'
								name='evictionStatus'
								value={props.formik.values.evictionStatus}
								onChange={props.formik.handleChange}
								onBlur={props.formik.handleBlur}
							>
								<div id='evictionButtonContainer'>
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
								</div>
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
