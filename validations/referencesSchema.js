import * as Yup from 'yup';

const referencesSchema = Yup.object({
	firstReferenceName: Yup.string()
		.max(35, 'Must be 35 characters or less')
		.matches(
			/^[a-zA-Z ']+$/,
			'No numbers or symbols are needed for this field.'
		)
		.required('Required'),
	firstReferenceTenure: Yup.string()
		.required('Required')
		.max(20, 'Must be 20 characters or less'),
	firstReferenceRelationship: Yup.string()
		.max(35, 'Must be 35 characters or less')
		.required('Required'),
	firstReferencePhone: Yup.string()
		.max(10, 'Must be 10 digits.')
		.min(10, 'Must be 10 digits.')
		.required('Required'),
	secondReferenceName: Yup.string()
		.max(35, 'Must be 35 characters or less')
		.matches(
			/^[a-zA-Z ']+$/,
			'No numbers or symbols are needed for this field.'
		)
		.required('Required'),
	secondReferenceTenure: Yup.string()
		.required('Required')
		.max(20, 'Must be 20 characters or less'),
	secondReferenceRelationship: Yup.string()
		.max(35, 'Must be 35 characters or less')
		.required('Required'),
	secondReferencePhone: Yup.string()
		.max(10, 'Must be 10 digits.')
		.min(10, 'Must be 10 digits.')
		.required('Required'),
	thirdReferenceName: Yup.string()
		.max(35, 'Must be 35 characters or less')
		.matches(
			/^[a-zA-Z ']+$/,
			'No numbers or symbols are needed for this field.'
		)
		.required('Required'),
	thirdReferenceTenure: Yup.string()
		.required('Required')
		.max(20, 'Must be 20 characters or less'),
	thirdReferenceRelationship: Yup.string()
		.max(35, 'Must be 35 characters or less')
		.required('Required'),
	thirdReferencePhone: Yup.string()
		.max(10, 'Must be 10 digits.')
		.min(10, 'Must be 10 digits.')
		.required('Required'),
	adultsNumber: Yup.number()
		// .max(1, 'Must be one character')
		.positive('Value must be zero or greater.')
		.integer()
		.required('Required'),
	childrenNumber: Yup.number()
		// .max(1, 'Must be one character')
		// .positive()
		.moreThan(-1, 'Value must be zero or greater.')
		.integer()
		.required('Required'),
	// .typeError('Value must be zero or greater.'),
	otherApplicants: Yup.string().max(
		35,
		'Please enter the names of other applicants that need to be added to the lease.'
	),
	// .required('Required'),
	evictionStatus: Yup.boolean().required('Required').oneOf([true, false]),
	// .nullable(),
	depositMoney: Yup.string()
		.max(7, 'Response must be 7 characters or less')
		.required('Required'),
});

export default referencesSchema;
