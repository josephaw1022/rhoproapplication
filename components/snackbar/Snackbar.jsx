import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
    snackbarSelector,
    showedSnackbarSelector,
} from "../../redux/entities/snackbar/snackbar.slice";

export const Snackbar = () => {
    const { enqueueSnackbar } = useSnackbar();
    const message = useSelector(snackbarSelector);
    const showedSnackbar = useSelector(showedSnackbarSelector);

    const [previousMessage, setPreviousMessage] = useState("");

    useEffect(() => {
        setPreviousMessage(message);
        if (
            Boolean(message) &&
            previousMessage !== message &&
            !showedSnackbar
        )
            enqueueSnackbar(message);
    }, [message]);

    return null;
};
