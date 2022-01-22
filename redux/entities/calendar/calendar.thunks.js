import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../../utils/request";
import axios from 'axios'

export const getEvents = createAsyncThunk(
	"/events",
	async ({ callback, ...payload }) => {
		const { data } = await axios.get(`/api/calendar`);
		callback(null, data);
	}
);

export const getEvent = createAsyncThunk(
	"get event",
	async ({ callback, ...payload }) => {
		const { data } = await axios.get(
			`/api/calendar/${String(payload.id)}`
		);
		callback(null, data);
	}
);
