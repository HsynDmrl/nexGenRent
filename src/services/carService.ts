import { AxiosResponse } from "axios";
import {AddCarRequest} from "../models/cars/requests/addCarRequest";
import {UpdateCarRequest} from "../models/cars/requests/updateCarRequest";
import {AddCarResponse} from "../models/cars/response/addCarResponse";
import {GetAllCarResponse} from "../models/cars/response/getAllCarResponse";
import {GetByIdCarResponse} from "../models/cars/response/getByIdCarResponse";
import {UpdateCarResponse} from "../models/cars/response/updateCarResponse";
import {BaseService} from "./baseService";
import axiosInstance from "../core/utils/interceptors/axiosInterceptors";

class CarService extends BaseService<
	GetAllCarResponse,
	GetByIdCarResponse,
	AddCarRequest,
	AddCarResponse,
	UpdateCarRequest,
	UpdateCarResponse
> {
	constructor() {
		super();
		this.apiUrl = "cars";
	}

	customAdd(formData: FormData): Promise<AxiosResponse<AddCarResponse, any>> {
		return axiosInstance.post<AddCarResponse>(`${this.apiUrl}/add`, formData);
	}
}

export default new CarService();
