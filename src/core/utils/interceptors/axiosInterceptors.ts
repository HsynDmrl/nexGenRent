import axios from "axios";
import tokenService from "../../../services/tokenService";
import authService from "../../../services/authService";
import { useNavigate } from 'react-router-dom';
import { updateTokenDetails } from "../../../store/auth/authSlice";

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
    
    // Eğer refreshToken mevcutsa ve 403 hatası alınırsa
    if (error.response && error.response.status === 403 && tokenService.getRefreshToken()) {
      try {
        const tokenResponse = await authService.refreshAccessToken();
        const accessToken = tokenResponse.accessToken;
        const refreshToken = tokenResponse.refreshToken;
        
        dispatch(updateTokenDetails({ accessToken, refreshToken }));
        
        return axiosInstance(originalRequest);
      } catch (error) {
        const navigate = useNavigate();
        navigate("/login");
      }
    }

    if ((!tokenService.getRefreshToken() || error.response.status === 403) && !originalRequest._retry) {
      tokenService.removeToken();
      const navigate = useNavigate();
      navigate("/login");
    }

    if (error.response) {
      console.error(`HTTP ${error.response.status}`, error.response.data.message);
    }

    return Promise.reject(error);
  }
);



export default axiosInstance;
function dispatch(arg0: { payload: any; type: "auth/updateTokenDetails"; }) {
  throw new Error("Function not implemented.");
}

