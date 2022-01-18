import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API = process.env.REACT_APP_API_ENDPOINT;

export const getUsers = createAsyncThunk(
	"users",
	async ({ callback, ...payload }) => {
		const response = await axios.get(`/api/brothers`);
		callback(null, response.data);
	}
);

export const getBrother = createAsyncThunk(
	"brother",
	async ({ callback, ...payload }) => {
		const response = await axios.get(`/api/brothers/${payload.id}`);
		callback(null, response.data);
	}
);
