import axios from "axios";
import tokenService from "../../../services/tokenService";
import {store} from "../../../store/configureStore";
import {
	decreaseRequestCount,
	increaseRequestCount,
} from "../../../store/loading/loadingSlice";

const axiosInstance = axios.create({
	baseURL: "https://nexgenrentacar.azurewebsites.net/api/",
});

axiosInstance.interceptors.request.use(config => {
	let token = tokenService.getToken();
	if (token) config.headers.Authorization = `Bearer ${token}`;

	//store.dispatch(increaseRequestCount());

	return config;
});

axiosInstance.interceptors.response.use(
	response => {
	  console.log("response", response);
	  return response;
	},
	error => {
	  if (error.response && error.response.status === 400) {
		console.error("HTTP 400 Bad Request:", error.response.data.message);
	  }
	  return Promise.reject(error);
	}
  );
  

export default axiosInstance;
