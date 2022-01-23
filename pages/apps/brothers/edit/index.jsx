import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NavAndTab } from "../../../../components/layout/NavAndTab";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { getBrother } from "../../../../redux/entities/users/user.thunks";
import { FolderSpecial as FolderSpecialIcon } from "@mui/icons-material";
import { ArrowBack } from "@mui/icons-material";
import { FormTemplateComponent } from "../../../../components/form/Template";
import { NavMenu } from "../../../../components/navbar/NavMenu";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { createUser } from "../../../../redux/entities/users/user.thunks";

export default function ViewBrother() {
	const [loading, setLoading] = useState();
	const [error, setError] = useState(false);
	const dispatch = useDispatch();
	const [brother, setBrother] = useState({
		name: "",
		scroll_number: "",
		email: "",
		cell_phone: "",
	});
	const router = useRouter();
	const [tab, setTab] = useState("Person");

	const TABS = [
		{
			label: "Person",
			icon: (
				<PersonOutlinedIcon
					className={tab === "Person" ? "icon" : null}
				/>
			),
		},
		{
			label: "Merits",
			icon: (
				<FolderSpecialIcon
					className={tab === "Merits" ? "icon" : null}
				/>
			),
		},
	];

	const validation = {};

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

	const handleGoBack = () => {
		router.push("/apps/brothers");
	};

	const handleCloseNavMenu = () => setAnchorEl(null);

	const handleSubmit = values => {
		let formObject = values;
		formObject.active = true;
		dispatch(
			createUser({
				...formObject,
				callback: () => {
					router.push("/apps/brothers");
				},
			})
		);
	};

	return (
		<div className="overflow-y-hidden ">
			<NavAndTab
				icon={
					<IconButton onClick={handleGoBack}>
						<ArrowBack className="icon" />
					</IconButton>
				}
				title={"Create Brother"}
				tabs={TABS}
				selectedTab={tab}
				setTab={tab => setTab(tab)}
				loading={loading}
				error={error}
				hideNav={true}
			>
				<FormTemplateComponent
					initialValues={brother}
					submitValue={values => handleSubmit(values)}
					validationSchema={validation}
					FormTemplate={FormTemplate}
					constant={false}
				/>
			</NavAndTab>
		</div>
	);
}
