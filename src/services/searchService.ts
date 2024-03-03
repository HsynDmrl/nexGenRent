
import axiosInstance from '../core/utils/interceptors/axiosInterceptors';
import { AxiosResponse } from 'axios';
import { Car } from '../models/cars/entity/car';


type SearchResponseType = AxiosResponse<{ data: Car[] }>;


export const searchCars = (searchTerm: string): Promise<SearchResponseType> => {

  return axiosInstance.get<{ data: Car[] }>('/api/v1/search', {
    params: { searchTerm },
  });
};
