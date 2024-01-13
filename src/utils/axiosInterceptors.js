import axios from "axios";
import config from '../data/config.json';

const axiosInstance = axios.create({
    baseURL: config.apiBaseUrl,
  });

axiosInstance.interceptors.request.use(config => {
	console.log("İstek atılıyor..");
	return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
      console.log('Cevap geldi');
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 404) {
        console.log(error.response.data.message);
      } else {
        console.log(error);
      }
      return Promise.reject(error);
    }
  );
  

export default axiosInstance;