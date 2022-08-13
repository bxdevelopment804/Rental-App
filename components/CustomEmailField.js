import { TextField } from '@mui/material';

const CustomEmailField = (props) => {
	const id = props.id;
	const backgroundColor = 'rgb(240, 248, 255, 0.95)';

	return (
		<div id='customTextFieldContainer'>
			{props.mandatory === 'true' && (
				<TextField
					fullWidth
					id={id}
					name={id}
					label={props.label}
					required
					type='email'
					value={props.formik.values[id]}
					onChange={props.formik.handleChange}
					onBlur={props.formik.handleBlur}
					error={props.formik.touched[id] && Boolean(props.formik.errors[id])}
					helperText={props.formik.touched[id] && props.formik.errors[id]}
					sx={{
						backgroundColor: { backgroundColor },
					}}
				/>
			)}

			{props.mandatory === 'false' && (
				<TextField
					fullWidth
					id={id}
					name={id}
					label={props.label}
					type='email'
					value={props.formik.values[id]}
					onChange={props.formik.handleChange}
					onBlur={props.formik.handleBlur}
					error={props.formik.touched[id] && Boolean(props.formik.errors[id])}
					helperText={props.formik.touched[id] && props.formik.errors[id]}
					sx={{
						backgroundColor: { backgroundColor },
					}}
				/>
			)}
		</div>
	);
};

export default CustomEmailField;
