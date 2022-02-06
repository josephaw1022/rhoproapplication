import Navbar from "../../../components/navbar/Navbar"
import LoggedIn from "../../../components/auth/LoggedIn"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { FolderSpecial as FolderSpecialIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import React, {useState, useEffect} from 'react'
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";



export default function ViewJob(props){
    const [loading, setLoading] = useState();
	const [error, setError] = useState(false);
	const dispatch = useDispatch();
	const [job, setJob] = useState({});
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
			label: "Merits / Demerits",
			icon: (
				<FolderSpecialIcon
					className={tab === "Merits / Demerits" ? "icon" : null}
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
				value: job.name,
			},
			{
				fieldName: "cell_phone",
				label: "Cellphone",
				type: "tel",
				value: job.cell_phone,
			},
		],
		[
			{
				fieldName: "scroll_number",
				label: "Scroll Number",
				type: "number",
				value: job.scroll_number,
			},
			{
				fieldName: "email",
				label: "Email",
				type: "email",
				value: job.email,
			},
		],
	];

    const handleGoBack = () => router.back()
    
    return(
    

        <Navbar
            title="View Job"
            icon={<><IconButton onClick={handleGoBack}><ArrowBack className="icon "/> </IconButton></>}
        /> 
    

    )



}