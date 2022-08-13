import * as Yup from 'yup';

const signatureSchema = Yup.object({
	signedBy: Yup.string()
		.max(35, 'Must be 35 characters or less')
		.matches(
			/^[a-zA-Z ']+$/,
			'No numbers or symbols are needed for this field.'
		)
		.required('Required'),
	signatureDate: Yup.date().required('Required'),
});

export default signatureSchema;
