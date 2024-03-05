
import { BaseService } from './baseService';
import { AxiosResponse } from 'axios';
import axiosInstance from '../core/utils/interceptors/axiosInterceptors';


export interface CarFilterModel {
    brandId?: number;
    modelId?: number;
    year?: number;
    colorId?: number;
    gearType?: string;
    fuelType?: string;
    minDailyPrice?: number;
    maxDailyPrice?: number;
}


export class FilterService extends BaseService<any, any, CarFilterModel, any, CarFilterModel, any> {
    constructor() {
        super();
        this.apiUrl = ""; 
    }

    getFilteredCars(filters: CarFilterModel): Promise<AxiosResponse<any, any>> {
        return axiosInstance.get<any>(`${this.apiUrl}/filters`, { params: filters });
    }

    async fetchCarsWithFilters(filters: any) {
        try {
          const response = await axiosInstance.get('filters/car', { params: filters });
          return response.data;
        } catch (error) {
          console.log('error', error);
          throw new Error('Filtreleme işlemi başarısız oldu');
        }
      }
}

export default new FilterService();
