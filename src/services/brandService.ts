import { AxiosResponse } from "axios";
import {AddBrandRequest} from "../models/brands/requests/addBrandRequest";
import {UpdateBrandRequest} from "../models/brands/requests/updateBrandRequest";
import {AddBrandResponse} from "../models/brands/response/addBrandResponse";
import {GetAllBrandResponse} from "../models/brands/response/getAllBrandResponse";
import {GetByIdBrandResponse} from "../models/brands/response/getByIdBrandResponse";
import {UpdateBrandResponse} from "../models/brands/response/updateBrandResponse";
import {BaseService} from "./baseService";
import axiosInstance from "../core/utils/interceptors/axiosInterceptors";

class BrandService extends BaseService<
	GetAllBrandResponse,
	GetByIdBrandResponse,
	AddBrandRequest,
	AddBrandResponse,
	UpdateBrandRequest,
	UpdateBrandResponse
> {
	constructor() {
		super();
		this.apiUrl = "brands";
	}

	customAdd(formData: FormData): Promise<AxiosResponse<AddBrandResponse, any>> {
		return axiosInstance.post<AddBrandResponse>(`${this.apiUrl}/add`, formData);
	}
}

export default new BrandService();
