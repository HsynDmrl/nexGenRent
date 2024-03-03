import { AxiosResponse } from "axios";
import { BaseService } from "./baseService";
import axiosInstance from "../core/utils/interceptors/axiosInterceptors";

// Kiralama ile ilgili model türlerini import edin
import { AddRentalRequest } from "../models/rentals/requests/addRentalRequest";
import { UpdateRentalRequest } from "../models/rentals/requests/updateRentalRequest";
import { AddRentalResponse } from "../models/rentals/response/addRentalResponse";
import { GetAllRentalResponse } from "../models/rentals/response/getAllRentalResponse";
import { GetByIdRentalResponse } from "../models/rentals/response/getByIdRentalResponse";
import { UpdateRentalResponse } from "../models/rentals/response/updateRentalResponse";

class RentalService extends BaseService<
    GetAllRentalResponse,
    GetByIdRentalResponse,
    AddRentalRequest,
    AddRentalResponse,
    UpdateRentalRequest,
    UpdateRentalResponse
> {
    constructor() {
        super();
        this.apiUrl = "rentals"; // Backend servisinizdeki kiralama ile ilgili endpoint
    }
}

export default new RentalService();
