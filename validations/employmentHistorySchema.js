import * as Yup from 'yup';

const employmentHistorySchema = Yup.object({
	presentEmployer: Yup.string()
		.max(35, 'Response must be 35 characters or less')
		.required('Required'),
	position: Yup.string()
		.max(35, 'Response must be 35 characters or less')
		.required('Required'),
	monthlyIncome: Yup.string()
		.max(7, 'Response must be 7 characters or less')
		.required('Required'),
	employerPhone: Yup.string()
		.max(10, 'Must be 10 digits.')
		.min(10, 'Must be 10 digits.')
		.required('Required'),
	employerTenure: Yup.string()
		.required('Required')
		.max(20, 'Must be 20 characters or less'),
	otherIncome: Yup.string().max(7, 'Response must be 7 characters or less'),
	// .required('Required'),
	employerAddress: Yup.string()
		.max(35, 'Must be 35 characters or less')
		.required('Required'),
	employerCity: Yup.string()
		.max(20, 'Must be 20 characters or less')
		.matches(
			/^[a-zA-Z ']+$/,
			'No numbers or symbols are needed for this field.'
		)
		.required('Required'),
	employerState: Yup.string()
		.max(2, 'Enter two letter state abbreviation.')
		.min(2, 'Enter two letter state abbreviation.')
		.matches(/^[a-zA-Z]+$/, 'Enter two letter state abbreviation.')
		.required('Required'),
	employerZip: Yup.string()
		.max(5, 'Must be five digits.')
		.min(5, 'Must be five digits.')
		.matches(/^\d*$/, 'Enter five digit zip code.')
		.required('Required'),
});

export default employmentHistorySchema;
