import axios from "axios";
import tokenService from "../../../services/tokenService";
import authService from "../../../services/authService";
import { useNavigate } from 'react-router-dom';

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
    
    const refreshToken = tokenService.getRefreshToken();
    if(!refreshToken && error.response && error.response.status === 401) {
      const navigate = useNavigate();
      navigate("/login");
    }
    else if (error.response && error.response.status === 403 && !originalRequest._retry) {
      try {
        const tokenResponse = await authService.refreshAccessToken();
        tokenService.setToken(tokenResponse.accessToken);
        tokenService.setRefreshToken(tokenResponse.refreshToken);
        return axiosInstance(originalRequest);
      } catch (error) {
        const navigate = useNavigate();
        navigate("/login");
      }
    }

    if (error.response) {
      console.error(`HTTP ${error.response.status}`, error.response.data.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
