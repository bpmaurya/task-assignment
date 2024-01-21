import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import {
	Autocomplete,
	Button,
	CircularProgress,
	FormHelperText,
	TextField,
} from "@mui/material";
import { Person, addPerson } from "../features/personSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./person.css";
import { PersonalInfo } from "./PersonComponent";
import axios from "axios";

export interface AddressDetails1 {
	address: string;
	state: string;
	city: string;
	country: string;
	pincode: number;
}

const schema = yup.object().shape({
	address: yup.string(),
	state: yup.string(),
	city: yup.string(),
	country: yup.string().required("country required!"),
	pincode: yup.number(),
});

export default function AddressFormComponent(props: {
	personDetails: PersonalInfo;
	onClick: () => void;
}) {
	const dispatch = useAppDispatch();

	const [personalDetails, setPersonalDetails] = useState<PersonalInfo>();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<any>({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data: AddressDetails1) => {
		const allUserData = {
			id: new Date().toDateString(),
			...personalDetails,
			...data,
		};
		console.log(allUserData);
		dispatch(addPerson({ userData: allUserData as Person }));
		props.onClick();
	};
	useEffect(() => {
		if (props.personDetails) setPersonalDetails(props.personDetails);
	}, [props.personDetails]);

	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState<readonly { title: string }[]>(
		[]
	);
	const loading = open && options.length === 0;

	React.useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {
			await axios.get("https://restcountries.com/v3.1/all").then((res: any) => {
				console.log(res);
				if (res.data.length !== 0) {
					const data: any = [];
					res.data.map((e: any) => data.push({ title: e.name.common }));
					if (active) {
						setOptions([...data]);
					}
				}
			});
		})();

		return () => {
			active = false;
		};
	}, [loading]);

	React.useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-md-6">
						<div className="flex flex-row">
							<div className="p-2">
								<TextField
									fullWidth
									id="outlined-basic"
									label="Address"
									type="text"
									variant="outlined"
									error={!!errors.address}
									helperText={
										!!errors.address ? errors.address.message : ("" as any)
									}
									{...register("address")}
								/>
							</div>

							<div className="p-2">
								<TextField
									fullWidth
									id="outlined-basic"
									label="State"
									type="string"
									variant="outlined"
									error={!!errors.state}
									helperText={
										!!errors.state ? errors.state.message : ("" as any)
									}
									{...register("state")}
								/>
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="row">
							<div className="col-md-6">
								<div className="p-2">
									<Autocomplete
										fullWidth
										id="asynchronous-demo"
										sx={{ width: "100%" }}
										open={open}
										onOpen={() => {
											setOpen(true);
										}}
										onClose={() => {
											setOpen(false);
										}}
										isOptionEqualToValue={(option, value) =>
											option.title === value.title
										}
										getOptionLabel={(option) => option.title}
										options={options}
										loading={loading}
										renderInput={(params) => (
											<TextField
												{...params}
												required
												defaultValue={{ title: "select country" }}
												{...register("country")}
												label="Select Country"
												InputProps={{
													...params.InputProps,
													endAdornment: (
														<React.Fragment>
															{loading ? (
																<CircularProgress color="inherit" size={20} />
															) : null}
															{params.InputProps.endAdornment}
														</React.Fragment>
													),
												}}
											/>
										)}
									/>
									<FormHelperText style={{ color: "#d32f2f" }}>
										{!!errors.country ? errors.country.message : ("" as any)}
									</FormHelperText>
								</div>
								<div className="p-2">
									<TextField
										fullWidth
										id="outlined-basic"
										label="Pincode"
										type="number"
										variant="outlined"
										error={!!errors.pincode}
										helperText={
											!!errors.pincode ? errors.pincode.message : ("" as any)
										}
										{...register("pincode")}
									/>
								</div>
							</div>
							<div className="col-md-6">
								<div className="p-2">
									<TextField
										fullWidth
										id="outlined-basic"
										label="City"
										type="text"
										variant="outlined"
										error={!!errors.city}
										helperText={
											!!errors.city ? errors.city.message : ("" as any)
										}
										{...register("city")}
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
						Submit
					</Button>
				</div>
			</form>
		</>
	);
}
