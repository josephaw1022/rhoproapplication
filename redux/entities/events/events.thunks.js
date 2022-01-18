import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getEvents = createAsyncThunk(
    "/events",
    async ({ callback, ...payload }) => {
        const { data } = await axios.get(`/api/events`);
        callback(null, data);
    }
);

export const getEvent = createAsyncThunk(
    "/events/:id",
    async ({ callback, ...payload }) => {
    x
        const { data } = await axios.get(`/api/events/${payload?.id}`)
        callback(null,data)
    }
);
