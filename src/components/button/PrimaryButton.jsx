import React from "react";
import { Button } from "@mui/material";


export const PrimaryButton = props => {
    

    return (
        <Button
            
            variant="contained"
            disableElevation
            fullWidth
            
            {...props}
        >
            <span className="text-ellipsis p-2 ">{props.children}</span>
        </Button>
    );
};
