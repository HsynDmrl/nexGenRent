import axios from "axios";
import tokenService from "../../../services/tokenService";
import authService from "../../../services/authService";
import { store } from "../../../store/configStore/configureStore";
import {
  decreaseRequestCount,
  increaseRequestCount,
} from "../../../store/loading/loadingSlice";

const axiosInstance = axios.create({
  baseURL: "https://nexgenrentacar.azurewebsites.net/api/",
});

axiosInstance.interceptors.request.use((config) => {
  let token = tokenService.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await authService.refreshAccessToken();

        const accessToken = tokenService.getToken();
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Unable to refresh token", refreshError);
        return Promise.reject(refreshError);
      }
    }

    if (error.response) {
      console.error(`HTTP ${error.response.status}`, error.response.data.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
