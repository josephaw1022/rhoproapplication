import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NavAndTab } from "../../../components/layout/NavAndTab";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { getBrother } from "../../../redux/entities/users/user.thunks";
import { FolderSpecial as FolderSpecialIcon } from "@mui/icons-material";
import { ArrowBack } from "@mui/icons-material";
import { FormTemplateComponent } from "../../../components/form/Template";
import { NavMenu } from "../../../components/navbar/NavMenu";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";

export default function ViewBrother() {
	const [loading, setLoading] = useState();
	const [error, setError] = useState(false);
	const dispatch = useDispatch();
	const [brother, setBrother] = useState({});
	const router = useRouter();
	const { id } = router.query;
	const [tab, setTab] = useState("Person");
	const [anchorEl, setAnchorEl] = useState(null);
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
	const navMenuItems = [
		{
			label: "Edit",
			props: {
				onClick: () => router.push(`/apps/brothers/edit/${id}`),
			},
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

	useEffect(() => {
		dispatch(
			getBrother({
				id: id,
				callback: (err, resp) => {
					setBrother(resp);
					setLoading(false);
					if (err) setError(true);
				},
			})
		);
	}, []);

	const handleGoBack = () => {
		router.push("/apps/brothers");
	};

	const handleMoreClick = event => {
		setAnchorEl(event.target);
	};

	const handleCloseNavMenu = () => setAnchorEl(null);

	const handleSubmit = values => {};

	return (
		<div className="overflow-y-hidden ">
			<NavAndTab
				icon={
					<IconButton onClick={handleGoBack}>
						<ArrowBack className="icon" />
					</IconButton>
				}
				suffix={
					<>
						<IconButton onClick={handleMoreClick}>
							<MoreVertIcon className="icon" />
						</IconButton>
						<NavMenu
							anchorEl={anchorEl}
							handleClose={handleCloseNavMenu}
							values={navMenuItems}
						/>
					</>
				}
				title={"View Brother"}
				tabs={TABS}
				selectedTab={tab}
				setTab={tab => setTab(tab)}
				loading={loading}
				error={error}
			>
				<FormTemplateComponent
					initialValues={brother}
					submitValue={values => handleSubmit(values)}
					validationSchema={validation}
					FormTemplate={FormTemplate}
					constant={true}
				/>
			</NavAndTab>
		</div>
	);
}
