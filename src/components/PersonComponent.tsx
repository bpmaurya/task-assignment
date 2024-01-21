import { useState } from "react";
import "datatables.net-dt/css/jquery.dataTables.css";
import {
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./person.css";
import AddressFormComponent from "./AddressFormComponent";

export interface PersonalInfo {
	name: string;
	age: number;
	sex: string;
	mobile: string;
	govIdType: string;
	govId?: string | any;
}

const schema = yup.object().shape({
	name: yup.string().min(4).required("Name is a required field"),
	age: yup
		.number()
		.positive()
		.required("age is a required field")
		.test(
			"Is positive?",
			"The number must be greater than 15!",
			(value) => value > 15
		),
	sex: yup
		.string()
		.required("Sex is a required field")
		.oneOf(["Male", "Female"]),
	govIdType: yup
		.string()
		.required("govIdType is a required field")
		.oneOf(["Aadhar", "PAN"]),
	mobile: yup
		.string()
		.required("Mobile is a required field")
		.matches(
			/^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
			"Invalid Mobile number format"
		),
	govId: yup.string().when("govIdType", {
		is: "Aadhar",
		then: (schema) =>
			schema
				.min(12)
				.max(12)
				.required("It should have 12 numeric digits")
				.test(
					"no-leading-zero",
					"Leading zero is not allowed",
					(value, context) => {
						return (
							context.originalValue && !context.originalValue.startsWith("0")
						);
					}
				)
				.test(
					"no-leading-one",
					"Leading 1 is not allowed",
					(value, context) => {
						return (
							context.originalValue && !context.originalValue.startsWith("1")
						);
					}
				)
				.matches(/^\d+$/, "only number allowed"),
		otherwise: (schema) =>
			schema
				.min(10)
				.max(10)
				.required("It should have 10 alpha numeric digits")
				.matches(/^[0-9a-z]+$/, "enter valid pan"),
	}),
});

export function PersonComponent() {
	const [personalInfo, setPersonalInfo] = useState<PersonalInfo | undefined>();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<PersonalInfo>({
		resolver: yupResolver(schema),
	});

	const onSubmitPersonalDetails = (data: PersonalInfo) => {
		setPersonalInfo(data);
	};
	const resetFormInput = () => {
		setPersonalInfo(undefined);
		reset();
	};
	return (
		<>
			{!personalInfo && (
				<form onSubmit={handleSubmit(onSubmitPersonalDetails)}>
					<div className="row">
						<div className="col-md-6">
							<div className="flex flex-row">
								<div className="p-2">
									<TextField
										fullWidth
										id="outlined-basic"
										required
										label="Name"
										type="text"
										variant="outlined"
										error={!!errors.name}
										helperText={!!errors.name ? errors.name.message : ""}
										{...register("name")}
									/>
								</div>

								<div className="p-2">
									<TextField
										fullWidth
										id="outlined-basic"
										label="Mobile"
										required
										type="number"
										variant="outlined"
										error={!!errors.mobile}
										helperText={!!errors.mobile ? errors.mobile.message : ""}
										{...register("mobile")}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="row">
								<div className="col-md-6">
									<div className="p-2">
										<FormControl fullWidth>
											<InputLabel id="demo-simple-select-label">Sex</InputLabel>
											<Select
												required
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												label="Age"
												error={!!errors.sex}
												{...register("sex")}
											>
												<MenuItem value="Male">Male</MenuItem>
												<MenuItem value="Female">Female</MenuItem>
											</Select>
											<FormHelperText style={{ color: "#d32f2f" }}>
												{!!errors.sex ? errors.sex.message : ""}
											</FormHelperText>
										</FormControl>
									</div>
									<div className="p-2">
										<TextField
											fullWidth
											id="outlined-basic"
											label="Age"
											type="number"
											required
											variant="outlined"
											error={!!errors.age}
											helperText={!!errors.age ? errors.age.message : ""}
											{...register("age")}
										/>
									</div>
								</div>
								<div className="col-md-6">
									<div className="p-2">
										<FormControl fullWidth>
											<InputLabel id="demo-simple-select-label">
												ID Type
											</InputLabel>
											<Select
												required
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												label="Gov Id Type"
												error={!!errors.govIdType}
												{...register("govIdType")}
											>
												<MenuItem value="Aadhar">Aadhar</MenuItem>
												<MenuItem value="PAN">PAN</MenuItem>
											</Select>
											<FormHelperText style={{ color: "#d32f2f" }}>
												{!!errors.govIdType ? errors.govIdType.message : ""}
											</FormHelperText>
										</FormControl>
									</div>

									<div className="p-2">
										<TextField
											fullWidth
											id="outlined-basic"
											label="Gov Id"
											required
											variant="outlined"
											error={!!errors.govId}
											helperText={
												!!errors && !!errors.govId
													? errors.govId.message
													: ("" as any)
											}
											{...register("govId")}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Button variant="contained" type="submit">
							Next
						</Button>
					</div>
				</form>
			)}
			{!!personalInfo && (
				<AddressFormComponent
					personDetails={personalInfo}
					onClick={() => resetFormInput()}
				/>
			)}
		</>
	);
}
