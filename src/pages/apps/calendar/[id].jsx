import {
	ArrowBack,
	FeedOutlined as FeedOutlinedIcon,
	MoreVert as MoreVertIcon,
	Work as WorkIcon,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FormTemplateComponent } from "../../../components/form/Template";
import { NavAndTab } from "../../../components/layout/NavAndTab";
import NavMenu from "../../../components/navbar/NavMenu";
import { getEvent } from "../../../redux/entities/calendar/calendar.thunks";
import LoggedIn from "../../../components/auth/LoggedIn";

export default function ViewEvent() {
	const [loading, setLoading] = useState();
	const [error, setError] = useState(false);
	const dispatch = useDispatch();
	const [event, setEvent] = useState({});
	const router = useRouter();
	const { id } = router.query;
	const [tab, setTab] = useState("Summary");
	const [anchorEl, setAnchorEl] = useState(null);
	const TABS = [
		{
			icon: (
				<FeedOutlinedIcon
					className={tab == "Summary" ? "icon" : null}
				/>
			),
			label: "Summary",
		},
		{
			label: "Jobs",
			icon: <WorkIcon className={tab == "Jobs" ? "icon" : null} />,
			onClick: () => {
				router.push(`/apps/jobs_for_events/${id}`);
			},
		},
	];
	const navMenuItems = [
		{
			label: "Edit",
			props: {
				onClick: () => router.push(`/apps/calendar/edit/${id}`),
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
				value: String(event?.name),
			},
		],
		[
			{
				fieldName: "start_time",
				label: "Start Time ",
				type: "text",
				value: String(event?.start_time),
			},
			{
				fieldName: "end_time",
				label: "End Time",
				type: "text",
				value: String(event?.end_time),
			},
		],
	];

	useEffect(() => {
		dispatch(
			getEvent({
				id: id,
				callback: (err, resp) => {
					if (resp) setEvent(resp);
					if (err) setError(true);
					setLoading(false);
				},
			})
		);
	}, []);

	const handleGoBack = () => {
		router.push("/apps/calendar");
	};

	const handleMoreClick = event => {
		setAnchorEl(event.target);
	};

	const handleCloseNavMenu = () => setAnchorEl(null);

	const handleSubmit = values => {};

	return (
		<LoggedIn>
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
					title={"View Event"}
					tabs={TABS}
					selectedTab={tab}
					setTab={tab => setTab(tab)}
					loading={loading}
					error={error}
				>
					<FormTemplateComponent
						initialValues={event}
						submitValue={values => handleSubmit(values)}
						validationSchema={validation}
						FormTemplate={FormTemplate}
						constant={true}
					/>
				</NavAndTab>
			</div>
		</LoggedIn>
	);
}
