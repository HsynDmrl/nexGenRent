import {AxiosResponse} from "axios";
import axiosInstance from "../core/utils/interceptors/axiosInterceptors";

export class BaseService<
	GetAllType,
	GetByIdType,
	AddRequestType,
	AddResponseType,
	UpdateRequestType,
	UpdateResponseType,
> {
	public apiUrl: string;

	constructor() {
		this.apiUrl = "";
	}

	getAll(): Promise<AxiosResponse<GetAllType, any>> {
        return axiosInstance.get<GetAllType>(`${this.apiUrl}/getAll`); 
    }

	getById(id: number): Promise<AxiosResponse<GetByIdType, any>> {
		return axiosInstance.get<GetByIdType>(`${this.apiUrl}/${id}?id=${id}`);
	}	

	add(request: AddRequestType): Promise<AxiosResponse<AddResponseType, any>> {
		return axiosInstance.post<AddResponseType>(`${this.apiUrl}/add`, request);
	}

	update(request: UpdateRequestType): Promise<AxiosResponse<UpdateResponseType, any>> {
		return axiosInstance.put<UpdateResponseType>(`${this.apiUrl}/update`, request);
	}

	delete(id: number) {
		return axiosInstance.delete(`${this.apiUrl}/${id}?id=${id}`);
	}
}
