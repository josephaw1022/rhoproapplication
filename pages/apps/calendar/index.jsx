import { IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import AppTable from "../../../components/table/Table";
import { EventCols } from "../../../constants/Table";
import LoggedIn from "../../../components/auth/LoggedIn";

export default function EventList() {
	const [drawer, setDrawer] = useState(false);

	const toggleDrawer = () => setDrawer(!drawer);

	return (
		<LoggedIn>
			<div className="h-full overflow-y-hidden overflow-x-hidden ">
				{drawer ? null : (
					<Navbar
						icon={
							<IconButton onClick={toggleDrawer}>
								<Menu className="icon" />
							</IconButton>
						}
						title={"Events"}
						suffix={null}
					/>
				)}
				<AppTable
					drawer={drawer}
					closeDrawer={() => {
						setDrawer(false);
					}}
					title="View Events"
					columns={EventCols}
					url={`/api/calendar`}
					entity="calendar"
				/>
			</div>
		</LoggedIn>
	);
}
