import React from 'react';
import {
	Alert,
	TextField,
	Radio,
	RadioGroup,
	FormLabel,
	FormControlLabel,
	FormControl,
	Box,
} from '@mui/material';
import { grid } from '@mui/system';

const RentalApplication = () => {
	function handleSubmit() {
		<Alert severity='success'>This is a success alert — check it out!</Alert>;
	}

	return (
		<>
			<h1 id='pageHeader' className='formLine'>
				Rental Application
			</h1>

			<form id='formGrid'>
				<div id='applicantNameLabel'>
					<label htmlFor='applicantName'>Applicants Full Name</label>
				</div>
				<div id='applicantName'>
					<TextField variant='standard' required fullWidth />
				</div>
				<div id='applicantDOBLabel'>
					<label htmlFor='applicantDOB'>DOB</label>
					{/* <TextField variant='standard' required fullWidth /> */}
				</div>
				<div id='applicantDOB'>
					<TextField variant='standard' required fullWidth />
				</div>

				<div id='applicantPhoneLabel'>
					<label htmlFor='applicantPhone'>Phone Number</label>
				</div>
				<div id='applicantPhone'>
					<TextField variant='standard' required fullWidth />
				</div>
				<div id='applicantEmailLabel'>
					<label htmlFor='applicantEmail'>Email</label>
				</div>
				<div id='applicantEmail'>
					<TextField variant='standard' required fullWidth />
				</div>

				<div id='currentAddressLabel'>
					<label htmlFor='currentAddress'>Current Address</label>
					{/* <div id='currentAddress'> */}
					<TextField variant='standard' required fullWidth />
					{/* </div> */}
					{/* <div id='currentCityLabel'> */}
					<label htmlFor='currentCity'>Current City</label>
					{/* </div> */}
					{/* <div id='currentCity'> */}
					<TextField variant='standard' required fullWidth />
					{/* </div> */}
					{/* <div id='currentStateLabel'> */}
					<label htmlFor='currentState'>Current State</label>
					{/* </div> */}
					{/* <div id='currentState'> */}
					<TextField variant='standard' required fullWidth />
					{/* </div> */}
					{/* <div id='currentZipLabel'> */}
					<label htmlFor='currentZip'>Current Zip</label>
					{/* </div> */}
					{/* <div id='currentZip'> */}
					<TextField variant='standard' required fullWidth />
					{/* </div> */}
				</div>

				<div id='currentTenureLabel'>
					<label htmlFor='currentTenure'>How long at this address?</label>
					<TextField variant='standard' required fullWidth />
					{/* </div> */}
					{/* <div id='currentTenure'>
					<TextField variant='standard' required fullWidth />
				</div> */}
					{/* <div id='currentReasonLabel'> */}
					<label htmlFor='currentReason'>Reason for leaving?</label>
					<TextField variant='standard' required fullWidth />
					{/* </div> */}
					{/* <div id='currentReason'>
					<TextField variant='standard' required fullWidth /> */}
				</div>
			</form>

			<div>TEST FORMAT #3</div>
			<div id='testContainer'></div>

			{/*		<form onSubmit={handleSubmit}>
				<div className='formLine'>
					<label htmlFor='applicantName'>Applicants Full Name</label>
					<TextField id='applicantName' variant='standard' required />
					<label htmlFor='applicantDOB'>DOB</label>
					<TextField id='applicantDOB' variant='standard' required />
				</div>
				<div className='formLine'>
					<label htmlFor='applicantPhone'>Phone #</label>
					<TextField id='applicantPhone' variant='standard' required />
					<label htmlFor='applicantEmail'>Email</label>
					<TextField id='applicantEmail' variant='standard' required />
				</div>
				<div className='formLine'>
					<label htmlFor='currentAddress'>Current Address</label>
					<TextField id='currentAddress' variant='standard' required />
					<label htmlFor='currentCity'>City</label>
					<TextField id='currentCity' variant='standard' required />
					<label htmlFor='currentState'>State</label>
					<TextField id='currentState' variant='standard' required />
					<label htmlFor='currentZip'>Zip</label>
					<TextField id='currentZip' variant='standard' required />
				</div>
				<div className='formLine'>
					<label htmlFor='currentLandlord'>Current Landlords Name</label>
					<TextField id='currentLandlord' variant='standard' required />
					<label htmlFor='currentLandlordPhone'>Landlords #</label>
					<TextField id='currentLandlordPhone' variant='standard' required />
				</div>
				<div className='formLine'>
					<label htmlFor='currentTenure'>How long at this address?</label>
					<TextField id='currentTenure' variant='standard' required />
					<label htmlFor='currentReason'>Reason for leaving?</label>
					<TextField id='currentReason' variant='standard' required />
				</div>
				<div className='formLine'>
					<label htmlFor='previousLandlord'>Previous Landlords Name</label>
					<TextField id='previousLandlord' variant='standard' required />
					<label htmlFor='previousLandlordPhone'>Landlords #</label>
					<TextField id='previousLandlordPhone' variant='standard' required />
				</div>
				<div className='formLine'>
					<label htmlFor='previousTenure'>How long at this address?</label>
					<TextField id='previousTenure' variant='standard' required />
					<label htmlFor='previousReason'>Reason for leaving?</label>
					<TextField id='previousReason' variant='standard' required />
				</div>
				<div className='formLine'>
					<label htmlFor='presentEmployer'>Present Employer</label>
					<TextField id='presentEmployer' variant='standard' required />
					<label htmlFor='position'>Position</label>
					<TextField id='position' variant='standard' required />
					<label htmlFor='monthlyIncome'>Monthly Income</label>
					<TextField id='monthlyIncome' variant='standard' required />
				</div>
				<div className='formLine'>
					<label htmlFor='employerPhone'>Phone #</label>
					<TextField id='employerPhone' variant='standard' required />
					<label htmlFor='employerTenure'>How long at job</label>
					<TextField id='employerTenure' variant='standard' required />
					<label htmlFor='otherIncome'>Other income/source</label>
					<TextField id='otherIncome' variant='standard' required />
				</div>
				<div className='formLine'>
					<label htmlFor='employersAddress'>Employer's Address</label>
					<TextField id='employersAddress' variant='standard' required />
					<label htmlFor='employersCity'>City</label>
					<TextField id='employersCity' variant='standard' required />
					<label htmlFor='employersState'>State</label>
					<TextField id='employersState' variant='standard' required />
				</div>
				<div className='formLine'>
					<label htmlFor='evictionRadioButtons'>
						Have you ever been party to an eviction?
					</label>
					<RadioGroup
						row
						aria-labelledby='demo-row-radio-buttons-group-label'
						name='row-radio-buttons-group'
						id='evictionRadioButtons'
						required
					>
						<div id='evictionButtonContainer'>
							<FormControlLabel value='true' control={<Radio />} label='Yes' />
							<FormControlLabel value='false' control={<Radio />} label='No' />
						</div>
					</RadioGroup>
					<label htmlFor='depositMoney'>Money for deposit?</label>
					<TextField id='depositMoney' variant='standard' />
				</div>
				<div id='referenceHeader' className='formLine'>
					Personal References:
				</div>
				<div className='formLine'>
					<label htmlFor='firstReferenceName'>Name</label>
					<TextField id='firstReferenceName' variant='standard' />
					<label htmlFor='firstReferenceTenure'>Yrs. Known</label>
					<TextField id='firstReferenceTenure' variant='standard' />
					<label htmlFor='firstReferenceRelationship'>Relationship</label>
					<TextField id='firstReferenceRelationship' variant='standard' />
					<label htmlFor='firstReferencePhone'>Phone #</label>
					<TextField id='firstReferencePhone' variant='standard' />
				</div>
				<div className='formLine'>
					<label htmlFor='secondReferenceName'>Name</label>
					<TextField id='secondReferenceName' variant='standard' />
					<label htmlFor='secondReferenceTenure'>Yrs. Known</label>
					<TextField id='secondReferenceTenure' variant='standard' />
					<label htmlFor='secondReferenceRelationship'>Relationship</label>
					<TextField id='secondReferenceRelationship' variant='standard' />
					<label htmlFor='secondReferencePhone'>Phone #</label>
					<TextField id='secondReferencePhone' variant='standard' />
				</div>
				<div className='formLine'>
					<label htmlFor='thirdReferenceName'>Name</label>
					<TextField id='thirdReferenceName' variant='standard' />
					<label htmlFor='thirdReferenceTenure'>Yrs. Known</label>
					<TextField id='thirdReferenceTenure' variant='standard' />
					<label htmlFor='thirdReferenceRelationship'>Relationship</label>
					<TextField id='thirdReferenceRelationship' variant='standard' />
					<label htmlFor='thirdReferencePhone'>Phone #</label>
					<TextField id='thirdReferencePhone' variant='standard' />
				</div>
				<div className='formLine'>
					<label htmlFor='adultsNumber'>Total number of adults</label>
					<TextField id='adultsNumber' variant='standard' />
					<label htmlFor='childrenNumber'>
						Total number of children living with you under the age of 18
					</label>
					<TextField id='childrenNumber' variant='standard' />
				</div>
				<div className='formLine'>
					<label htmlFor='otherApplicants'>
						Names and relations of all other applicants
					</label>
					<TextField id='otherApplicants' variant='standard' />
				</div>
				<div id='certificationParagraph' className='formLine'>
					I CERTIFY that answers given herein are true and complete to the best
					of my knowledge. I authorize investigation of all statements contained
					in this application for tenant screening as may be necessary in
					arriving at a tenant decision. I understand that the landlord may
					terminate any rental agreement entered into for any misrepresentations
					made above.
				</div>
				<div className='formLine'>
					<label htmlFor='signature'>Signature</label>
					<TextField id='signature' variant='standard' />
					<label htmlFor='date'>Date</label>
					<TextField id='date' variant='standard' />
				</div>
				<div id='submitButtonContainer' className='formLine'>
					<button id='submitButton' onClick={handleSubmit}>
						Submit Application
					</button>
				</div>
			</form> */}
		</>
	);
};

export default RentalApplication;
