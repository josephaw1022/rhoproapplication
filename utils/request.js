import axios from "axios";

export const request = axios.create();

request.interceptors.request.use(config => {
	config.headers.post["Content-Type"] = "application/json";
	return config;
});
