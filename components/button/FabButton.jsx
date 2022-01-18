import React from "react";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import {useRouter} from "next/router"

export const FabButton = props => {
    const navigate = useRouter()

    const handleClick = () => navigate.push(props?.to || "");
    return (
        <div
            className={`fixed right-0 bottom-0 mb-10 mr-10 ${props.className}`}
            {...props}
            onClick={handleClick}
        >
            <Fab color="primary" aria-label="add" sx={{backgroundColor:"initial"}}>
                <Add  className="icon" />
            </Fab>
        </div>
    );
};
