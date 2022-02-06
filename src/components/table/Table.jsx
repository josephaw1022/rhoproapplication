import {
	DataGrid,
	gridClasses,
	GridToolbarContainer,
	GridToolbarExport,
} from "@mui/x-data-grid";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FabButton } from "../button/FabButton";
import { DrawerComponent } from "../drawer/Drawer";
import { LoadingOrError } from "../layout/LoadingOrError";

function CustomToolbar() {
	return (
		<GridToolbarContainer className={gridClasses.toolbarContainer}>
			<GridToolbarExport />
		</GridToolbarContainer>
	);
}

export const AppTable = ({ columns, url, entity, ...props }) => {
	const [data, setData] = useState(props?.data || []);
	const [loading, setLoading] = useState(props.data ? false : true);
	const [error, setError] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const fetchTableData = async () => {
			const resp = await axios.get(url);
			setData(resp.data);
			setLoading(false);
		};
		if (!props.data) fetchTableData();
	}, []);

	const formattedCols = columns.map(item => ({ ...item, flex: 1 }));

	const onRowClick = params => {
		if (!props.disableRowClick)
			router.push(`/apps/${entity}/${params.id}`);
	};

	return (
		<>
			{props.drawer ? (
				<DrawerComponent
					closeDrawer={() => {
						props.closeDrawer();
					}}
					open={props.drawer}
				/>
			) : null}
			<LoadingOrError error={error} loading={loading}>
				<div className="overflow-y-none h-full overflow-x-hidden">
					<DataGrid
						sx={{ overFlowX: "hidden", height: "100%" }}
						autoHeight={false}
						rows={data}
						columns={formattedCols}
						components={{
							Toolbar: CustomToolbar,
						}}
						onRowClick={onRowClick}
						{...props}
					/>
				</div>
				<FabButton to={`/apps/${entity}/edit`} />
			</LoadingOrError>
		</>
	);
};

export default AppTable;
