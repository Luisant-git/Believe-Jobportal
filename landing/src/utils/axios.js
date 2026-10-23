import axios from "axios";
import { toast } from "react-toastify";
import { decryptToken } from "./auth";

const axiosServices = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

axiosServices.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      config.headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(
        error.response.data.message ||
          error.response.data.error ||
          "An error occurred"
      );
    }
    if (
      error.response &&
      error.response.status === 401 &&
      !window.location.href.includes("/")
    ) {
      localStorage.removeItem("serviceToken");
      window.location.pathname = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosServices;
