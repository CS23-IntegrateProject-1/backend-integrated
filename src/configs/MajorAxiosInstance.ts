import axios, { AxiosInstance } from 'axios';

const BASE_URL = process.env.API_MAJOR_URL || undefined;

export const Axios: AxiosInstance = axios.create({
    baseURL: BASE_URL || "",
    withCredentials: true,
})