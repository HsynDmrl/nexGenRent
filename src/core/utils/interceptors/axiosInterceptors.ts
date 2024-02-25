import axios from "axios";
import tokenService from "../../../services/tokenService";
import authService from "../../../services/authService";

const axiosInstance = axios.create({
  baseURL: "https://nexgenrentacar.azurewebsites.net/api/v1",
});

axiosInstance.interceptors.request.use((config) => {
  const token = tokenService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && originalRequest.url.includes("/auth/refresh-token")) {
      console.error('Refresh token is expired or invalid');
      tokenService.removeToken();
      window.location.href = "/";
      return Promise.reject(error);
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
        console.error('Error refreshing access token:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
