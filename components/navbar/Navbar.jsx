import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

export const Navbar = ({ title, icon, suffix }) => {
    return (
        <AppBar position="relative">
            <Toolbar>
                {icon}
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, marginLeft: "8" }}
                >
                    <span className="select-none m-0 p-0 ml-5">
                        {title}
                    </span>
                </Typography>

                {suffix}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar 