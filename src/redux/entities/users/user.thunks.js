import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { request } from "../../../utils/request";

export const createUser = createAsyncThunk(
	"create user",
	async ({ callback, ...payload }) => {
		try {
			console.log("payload = ", payload);
			const { data } = await request.post(`/api/brothers`, payload);
			callback(null, data);
		} catch (err) {
			callback(err, null);
		}
	}
);

export const getUsers = createAsyncThunk(
	"users",
	async ({ callback, ...payload }) => {
		const response = await request.get(`/api/brothers`);
		callback(null, response.data);
	}
);

export const getBrother = createAsyncThunk(
	"brother",
	async ({ callback, ...payload }) => {
		const response = await request.get(`/api/brothers/${payload.id}`);
		callback(null, response.data);
	}
);

export const updateBrother = createAsyncThunk(
	"update/brother",
	async ({ callback, ...payload }) => {
		try {
			console.log("payload = ", payload);
			const {data} = await request.put(
				`/api/brothers/${payload.id}`,
				payload
			);
			
			callback(null, data);
		} catch (err) {
			callback(err, null);
		}
	}
);
