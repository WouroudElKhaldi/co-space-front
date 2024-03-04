import axios from "axios";

const vari = process.env.NEXT_PUBLIC_BACKEND_PATH;

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_PATH
    ? `${process.env.NEXT_PUBLIC_BACKEND_PATH}`
    : "http://localhost:2004/",
  withCredentials: true,
});

export default axiosInstance;
