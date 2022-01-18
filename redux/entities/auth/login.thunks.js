import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../../utils/Request";

const API = process.env.REACT_APP_API_ENDPOINT;

export const attemptLogin = createAsyncThunk(
    "/login",
    async ({ callback, ...payload }) => {
        const resp = await request.post(`${API}/login`, payload);

        if (resp.data.error) callback(resp.data.error, null);

        if (resp.data.token) {
            sessionStorage.setItem(
                "tdx-token",
                String(resp.data.token)
            );
            callback(null, payload);
        }
    }
);
