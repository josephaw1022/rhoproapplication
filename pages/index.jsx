import { Card, CardActions, CardContent } from "@mui/material";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { PrimaryButton } from "../components/button/PrimaryButton";
import { TextInput } from "../components/form/Field";
import { Field } from "../components/form/FieldProps";
import {
	requiredEmailVal,
	requiredTextVal,
} from "../components/form/Validations";
import { Navbar } from "../components/navbar/Navbar";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

export default function Login(props) { 
	const dispatch = useDispatch();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const [formValOnSubmit, setFormValOnSubmit] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object().shape({
			email: requiredEmailVal(),
			password: requiredTextVal(),
		}),
		onSubmit: values => {
			/**
			 * ! remove this later
			 */
			 sessionStorage.setItem("tdx-token", 'replace-later');
			enqueueSnackbar("Logged in sucessfully");
			router.push("/apps/brothers");
			
			/**
			 * @keep_this_part
			 */
			//     if (formValOnSubmit !== values){
			//         dispatch(
			//             attemptLogin({
			//                 ...values,
			//                 callback: (err, token) => {
			//                     if (token) {
			//                         console.log(token)
			//                         enqueueSnackbar('Welcome to the application')
			//                         navigate("/brothers")
			//                     }
			//                     if (err) {
			//                         setErrorMessage(err);
			//                         setFormValOnSubmit(values);
			//                         enqueueSnackbar(err);
			//                     }
			//                 },
			//             })
			//         );
			// }
		},
	});

	const Form = {
		email: Field(formik, "email", "Email", "email"),
		password: Field(formik, "password", "Password", "password"),
	};

	return (
		<div className="h-full w-full overflow-y-hidden">
			<Navbar title={"Rho Proteron"} suffix={null} icon={null} />
			<div className="h-full w-full flex justify-center items-center">
				<form onSubmit={formik.handleSubmit}>
					<Card className=" ">
						<CardContent>
							<span className="text-black text-2xl p-2 text-center flex justify-center items-center mb-4 select-none">
								login
							</span>
							<div className="flex justify-center items-center gap-2">
								<div className="flex flex-row gap-4 w-full flex-wrap   ">
									<TextInput {...Form["email"]} />
									<TextInput {...Form["password"]} />
								</div>
							</div>
						</CardContent>
						<CardActions>
							<PrimaryButton type="submit">Submit</PrimaryButton>
						</CardActions>
					</Card>
				</form>
			</div>
		</div>
	);
}
