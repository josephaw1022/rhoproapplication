import { Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import AppTable from "../../../components/table/Table";
import { BrotherCols } from "../../../constants/Table";

export default function BrotherList(props) {
	const [drawer, setDrawer] = useState(false);

	const toggleDrawer = () => setDrawer(!drawer);

	return (
		<>
			<div className="h-full overflow-y-hidden overflow-x-hidden ">
				{drawer ? null : (
					<Navbar
						icon={
							<IconButton onClick={toggleDrawer}>
								<Menu className="icon" />
							</IconButton>
						}
						title={"Brothers"}
						suffix={null}
					/>
				)}
				<AppTable
					drawer={drawer}
					closeDrawer={() => {
						setDrawer(false);
					}}
					title="View Brothers"
					columns={BrotherCols}
					url={`/api/brothers`}
					entity="brothers"
				/>
			</div>
		</>
	);
}
