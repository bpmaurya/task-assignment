import React from "react";
import { useAppDispatch } from "../store/hooks";
import { Button, TextField } from "@mui/material";
import { addPerson } from "../features/personSlice";
import { TableComponent } from "./TableComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./person.css";

interface IFormInput {
	name: string;
	age: string;
	sex: string;
	mobile: string;
	govIdType: string;
	govId: string;
}
const schema = yup.object().shape({
	name: yup.string().min(3).required("Name is a required field"),
	age: yup.string().min(3).required("age is a required field"),
	sex: yup.string().min(3).required("Sex is a required field"),
	govIdType: yup.string().required("govIdType is a required field"),
	mobile: yup
		.string()
		.required("Mobile is a required field")
		.matches(
			/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
			"Invalid Mobile number format"
		),
	govId: yup
		.string()
		.required("Zipcode is a required field")
		.matches(/^\d{5}(?:[-\s]\d{4})?$/, "Invalid zipcode format"),
});

export function PersonComponent() {
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data: IFormInput) => {
		console.log(data);
		dispatch(addPerson({ name: "new name" }));
	};
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					id="outlined-basic"
					required
					label="Name"
					variant="outlined"
					error={!!errors.name}
					helperText={!!errors.name ? errors.name.message : ""}
					{...register("name")}
				/>
				<TextField
					id="outlined-basic"
					label="Age"
					required
					variant="outlined"
					error={!!errors.age}
					helperText={!!errors.age ? errors.age.message : ""}
					{...register("age")}
				/>
				<TextField
					id="outlined-basic"
					label="Sex"
					required
					variant="outlined"
					error={!!errors.sex}
					helperText={!!errors.sex ? errors.sex.message : ""}
					{...register("sex")}
				/>

				<TextField
					id="outlined-basic"
					label="Mobile"
					required
					variant="outlined"
					error={!!errors.mobile}
					helperText={!!errors.mobile ? errors.mobile.message : ""}
					{...register("mobile")}
				/>
				<TextField
					id="outlined-basic"
					label="Gov Id Type"
					variant="outlined"
					required
					error={!!errors.govIdType}
					helperText={!!errors.govIdType ? errors.govIdType.message : ""}
					{...register("govIdType")}
				/>
				<TextField
					id="outlined-basic"
					label="Gov Id"
					required
					variant="outlined"
					error={!!errors.govId}
					helperText={!!errors.govId ? errors.govId.message : ""}
					{...register("govId")}
				/>

				<Button variant="contained" type="submit">
					Submit
				</Button>
			</form>

			<TableComponent />
		</>
	);
}
