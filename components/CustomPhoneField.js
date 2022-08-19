import React from 'react';
import { TextField } from '@mui/material';
import NumberFormat from 'react-number-format';

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

const CustomPhoneField = (props) => {
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
					value={props.formik.values[id]}
					onChange={props.formik.handleChange}
					onBlur={props.formik.handleBlur}
					error={props.formik.touched[id] && Boolean(props.formik.errors[id])}
					helperText={props.formik.touched[id] && props.formik.errors[id]}
					inputProps={{ format: '(###) ###-####' }}
					InputProps={{ inputComponent: NumberFormatCustom }}
					InputLabelProps={{
						shrink: props.formik.values[id] ? true : false,
					}}
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
					value={props.formik.values[id]}
					onChange={props.formik.handleChange}
					onBlur={props.formik.handleBlur}
					error={props.formik.touched[id] && Boolean(props.formik.errors[id])}
					helperText={props.formik.touched[id] && props.formik.errors[id]}
					inputProps={{ format: '(###) ###-####' }}
					InputProps={{ inputComponent: NumberFormatCustom }}
					InputLabelProps={{
						shrink: props.formik.values[id] ? true : false,
					}}
					sx={{
						backgroundColor: { backgroundColor },
					}}
				/>
			)}
		</div>
	);
};

export default CustomPhoneField;
