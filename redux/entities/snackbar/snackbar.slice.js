import { createSlice } from "@reduxjs/toolkit";

export const SnackbarSlice = createSlice({
    name: "Snackbar",
    initialState: {
        showedMessage: false,
        message: null,
    },
    reducers: {
        snackbar: (state, action) => {
            state.message = action.payload;
        },
        reset: (state, action) => {
            state.message = null;
            state.showedMessage = null;
        },
    },
});

export const { snackbar, reset } = SnackbarSlice.actions;

export default SnackbarSlice.reducer;

export const snackbarSelector = state => state.snackbar.message;
export const showedSnackbarSelector = state =>
    state.snackbar.showedMessage;
