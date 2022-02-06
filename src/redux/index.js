import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./entities/users/user.slice";
import snackbarSlice from "./entities/snackbar/snackbar.slice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        snackbar: snackbarSlice,
    },
});
