import React from "react";
import { Menu, MenuItem } from "@mui/material";

export function NavMenu(props) {
	return (
		<Menu
			open={Boolean(props.anchorEl)}
			anchorEl={props.anchorEl}
			onClose={props.handleClose}
		>
			{props.values.map((item, index) => (
				<MenuItem key={index} {...item.props} sx={{ width: "200px" }}>
					{item.label}
				</MenuItem>
			))}
		</Menu>
	);
}

export default NavMenu;
