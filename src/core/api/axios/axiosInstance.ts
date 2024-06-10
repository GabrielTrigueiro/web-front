import axios, { AxiosResponse } from "axios";
import getMessageFromHttpStatus from "./axiosUtils";
import { BACKEND_BASE_URL } from "../../utils/constans";

const axiosInstance = axios.create({
    baseURL: BACKEND_BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("userInfo");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

const noAuthAxiosInstance = axios.create({
    baseURL: BACKEND_BASE_URL,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error: any) => {
        if (error) {
            const errorMessage =
                getMessageFromBody(error.response) ||
                getMessageFromHttpStatus(error.response?.status) ||
                "erro de token";
            throw new Error(errorMessage);
        }
        throw error;
    }
);

function getMessageFromBody(
    response: AxiosResponse<any> | undefined
): string | undefined {
    return response?.data?.errors?.join(", ");
}

export { axiosInstance, noAuthAxiosInstance };
