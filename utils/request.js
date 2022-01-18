import axios from "axios";

export const request = axios.create();

request.interceptors.request.use(config => ({
    ...config,
    params: {
        access_token: sessionStorage.getItem("tdx-token"),
        ...(config?.params || null),
    },
}));
