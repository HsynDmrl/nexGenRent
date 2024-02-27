// services/FilterService.ts

import { BaseService } from './baseService';
import { AxiosResponse } from 'axios';
import axiosInstance from '../core/utils/interceptors/axiosInterceptors';

// Filter için kullanılacak tipi belirleyin, örneğin:
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

// GetAllType ve GetByIdType yerine kullanılacak gerçek tipleri sağlayın.
export class FilterService extends BaseService<any, any, CarFilterModel, any, CarFilterModel, any> {
    constructor() {
        super();
        this.apiUrl = ""; // API'nizin base URL'sini belirleyin
    }

    getFilteredCars(filters: CarFilterModel): Promise<AxiosResponse<any, any>> {
        return axiosInstance.get<any>(`${this.apiUrl}/filters`, { params: filters });
    }

    async fetchCarsWithFilters(filters: CarFilterModel) {
        try {
          const response = await axiosInstance.get('filters/car', { params: filters });
          return response.data;
        } catch (error) {
          // Hata durumunda hata işleme
          throw new Error('Filtreleme işlemi başarısız oldu');
        }
      }
}

export default new FilterService();
