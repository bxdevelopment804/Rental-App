import * as Yup from 'yup';

const personalInformationSchema = Yup.object({
	applicantName: Yup.string()
		.max(35, 'Must be 35 characters or less')
		.matches(
			/^[a-zA-Z ']+$/,
			'No numbers or symbols are needed for this field.'
		)
		.required('Required'),
	applicantPhone: Yup.string()
		.max(10, 'Must be 10 digits.')
		.min(10, 'Must be 10 digits.')
		.required('Required'),
	applicantDOB: Yup.date()
		// .default(() => new Date())
		.required('Required'),
	applicantEmail: Yup.string()
		.email('Invalid email address')
		.required('Required'),
	currentAddress: Yup.string()
		.max(35, 'Must be 35 characters or less')
		.required('Required'),
	currentCity: Yup.string()
		.max(20, 'Must be 20 characters or less')
		.matches(
			/^[a-zA-Z ']+$/,
			'No numbers or symbols are needed for this field.'
		)
		.required('Required'),
	currentState: Yup.string()
		.max(2, 'Enter two letter state abbreviation.')
		.min(2, 'Enter two letter state abbreviation.')
		.matches(/^[a-zA-Z]+$/, 'Enter two letter state abbreviation.')
		.required('Required'),
	currentZip: Yup.string()
		.max(5, 'Must be five digits.')
		.min(5, 'Must be five digits.')
		.matches(/^\d*$/, 'Enter five digit zip code.')
		.required('Required'),
	desiredLocation: Yup.string()
		.max(50, 'Must be 50 characters or less')
		.required('Required'),
});

export default personalInformationSchema;
