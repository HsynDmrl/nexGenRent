import axios from "axios";
import tokenService from "../../../services/tokenService";
import authService from "../../../services/authService";
import { addRequest, removeRequest } from "../../../store/loading/loadingSlice";
import { BASE_API_URL } from "../../../environment/environment";


const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = tokenService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  addRequest();
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

	if (error.response?.status === 403 && originalRequest.url.includes("/auth/refresh-token")) {
	  tokenService.removeToken();
	  window.location.href = "/";
    removeRequest();
	  return Promise.reject();
	}
    if (error.response?.status === 401 && originalRequest.url.includes("/auth/refresh-token")) {
      tokenService.removeToken();
      window.location.href = "/";
      removeRequest();
      return Promise.reject();
    }

    if (!originalRequest._retry && error.response?.status === 403) {
      originalRequest._retry = true;
      try {
        const tokenResponse = await authService.refreshAccessToken();
        if (tokenResponse.accessToken) {
          tokenService.setToken(tokenResponse.accessToken);
          if (tokenResponse.refreshToken) {
            tokenService.setRefreshToken(tokenResponse.refreshToken);
          }
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        removeRequest();
        return Promise.reject();
      }
    }
    removeRequest();
    return Promise.reject();
  }
);

export default axiosInstance;
