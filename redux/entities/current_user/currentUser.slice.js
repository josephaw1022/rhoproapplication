import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const setCurrentUser = createAsyncThunk("user", async payload => {
    return null;
});

export const CurrentUserSlice = createSlice({
    name: "currentUser",
    initialState: {
        loading: true,
        current_user: {},
    },
    reducers: {
        turnOffLoading: state => {
            state.loading = false;
        },
    },
    extraReducers: {},
});
