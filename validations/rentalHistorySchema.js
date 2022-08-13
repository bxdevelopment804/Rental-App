import * as Yup from 'yup';

const rentalHistorySchema = Yup.object({
	currentLandlord: Yup.string()
		.max(35, 'Must be 35 characters or less')
		.required('Required'),
	currentLandlordPhone: Yup.string()
		.max(10, 'Must be 10 digits.')
		.min(10, 'Must be 10 digits.')
		.required('Required'),
	currentTenure: Yup.string()
		.required('Required')
		.max(20, 'Must be 20 characters or less'),
	currentReason: Yup.string()
		.max(50, 'Response must be 50 characters or less')
		.required('Required'),
	previousAddress: Yup.string()
		.max(35, 'Must be 35 characters or less')
		.required('Required'),
	previousCity: Yup.string()
		.max(20, 'Must be 20 characters or less')
		.matches(
			/^[a-zA-Z ']+$/,
			'No numbers or symbols are needed for this field.'
		)
		.required('Required'),
	previousState: Yup.string()
		.max(2, 'Enter two letter state abbreviation.')
		.min(2, 'Enter two letter state abbreviation.')
		.matches(/^[a-zA-Z]+$/, 'Enter two letter state abbreviation.')
		.required('Required'),
	previousZip: Yup.string()
		.max(5, 'Must be five digits.')
		.min(5, 'Must be five digits.')
		.matches(/^\d*$/, 'Enter five digit zip code.')
		.required('Required'),
	previousLandlord: Yup.string()
		.max(35, 'Must be 35 characters or less')
		.matches(
			/^[a-zA-Z ']+$/,
			'No numbers or symbols are needed for this field.'
		)
		.required('Required'),
	previousLandlordPhone: Yup.string()
		.max(10, 'Must be 10 digits.')
		.min(10, 'Must be 10 digits.')
		.required('Required'),
	previousTenure: Yup.string()
		.required('Required')
		.max(20, 'Must be 20 characters or less'),
	previousReason: Yup.string()
		.max(50, 'Response must be 50 characters or less')
		.required('Required'),
});

export default rentalHistorySchema;
