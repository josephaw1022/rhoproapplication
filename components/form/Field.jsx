import { TextField } from "@mui/material";
import React from "react";

export const TextInput = props => {
    return (
        <TextField
            fullWidth
            className=""
            sx={{ textOverflow: "ellipsis" }}
            
            focused={false}
            {...props}
        />
    );
};

const fontColor = {
    style: { color: "#000" },
};
export const ConstantTextInput = props => {
    return (
        <TextField
            color="primary"
            fullWidth
            sx={{ textOverflow: "ellipsis" }}
            type={"Text"}
            focused={false}
            onChange={props.onChange}
            value={props.value}
            InputProps={fontColor}
            {...props}
        />
    );
};
