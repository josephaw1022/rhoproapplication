import { ArrowBack } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FormTemplateComponent } from "../../../../components/form/Template";
import {
	requiredEmailVal,
	requiredTextVal,
} from "../../../../components/form/Validations";
import { LoadingOrError } from "../../../../components/layout/LoadingOrError";
import { Navbar } from "../../../../components/navbar/Navbar";
import NavMenu from "../../../../components/navbar/NavMenu";
import {
	getBrother,
	updateBrother,
} from "../../../../redux/entities/users/user.thunks";
import LoggedIn from "../../../../components/auth/LoggedIn";
export const BrotherEdit = ({ newEntry, ...props }) => {
	const dispatch = useDispatch();
	const navigate = useRouter();
	const { id } = navigate.query;
	const [brother, setBrother] = useState({});
	const [loading, setLoading] = useState(newEntry ? false : true);
	const [error, setError] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const FormTemplate = [
		[
			{
				fieldName: "name",
				label: "Name",
				type: "text",
				value: brother.name,
			},
			{
				fieldName: "cell_phone",
				label: "Cellphone",
				type: "tel",
				value: brother.cell_phone,
			},
		],
		[
			{
				fieldName: "scroll_number",
				label: "Scroll Number",
				type: "number",
				value: brother.scroll_number,
			},
			{
				fieldName: "email",
				label: "Email",
				type: "email",
				value: brother.email,
			},
		],
	];

	const handleSubmit = values => {
		dispatch(
			updateBrother({
				...values,
				callback: () => {},
			})
		);
		navigate.push(`/apps/brothers/${id}`);
	};

	const validation = {
		name: requiredTextVal(),
		scroll_number: requiredTextVal(),
		email: requiredEmailVal(),
	};

	useEffect(() => {
		dispatch(
			getBrother({
				id,
				callback: (err, value) => {
					if (err) setError(true);
					if (value) setBrother(value);
					setLoading(false);
				},
			})
		);
	}, []);

	const handleGoBack = () => navigate.push(`/apps/brothers/${id}`);

	const handleMenuClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorEl(null);
	};

	const navMenuItems = [
		{
			label: "Make Inactive",
			props: {
				onClick: () => {
					let tempBrother = Object.assign({}, brother, {
						active: false,
					});
					dispatch(updateBrother({ ...tempBrother }));
					navigate.push("/apps/brothers");
				},
			},
		},
		{
			label: "Make Active",
			props: {
				onClick: () => {
					let tempBrother = Object.assign({}, brother, {
						active: true,
					});
					dispatch(updateBrother({ ...tempBrother }));
					navigate.push("/apps/brothers");
				},
			},
		},
		{
			label: "Delete brother",
			props: {
				onClick: () => {
					let tempBrother = Object.assign({}, brother, {
						deleted: true,
					});
					dispatch(updateBrother({ ...tempBrother }));
					navigate.push("/apps/brothers");
				},
			},
		},
	];

	return (
		<LoggedIn>
			<Navbar
				title={newEntry ? "Create Brother" : "Edit Brother"}
				icon={
					<IconButton onClick={handleGoBack}>
						<ArrowBack className="icon" />
					</IconButton>
				}
				suffix={
					newEntry ? null : (
						<>
							<IconButton onClick={handleMenuClick}>
								<MoreVertIcon className="icon" />
							</IconButton>
							<NavMenu
								anchorEl={anchorEl}
								handleClose={handleCloseNavMenu}
								values={navMenuItems}
							/>
						</>
					)
				}
			/>
			<LoadingOrError loading={loading} error={error}>
				<FormTemplateComponent
					initialValues={brother}
					submitValue={values => handleSubmit(values)}
					validationSchema={validation}
					FormTemplate={FormTemplate}
				/>
			</LoadingOrError>
		</LoggedIn>
	);
};

export default BrotherEdit;
