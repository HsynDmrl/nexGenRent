import {AddRentalRequest} from "../models/rentals/requests/addRentalRequest";
import {UpdateRentalRequest} from "../models/rentals/requests/updateRentalRequest";
import {AddRentalResponse} from "../models/rentals/response/addRentalResponse";
import {GetAllRentalResponse} from "../models/rentals/response/getAllRentalResponse";
import {GetByIdRentalResponse} from "../models/rentals/response/getByIdRentalResponse";
import {UpdateRentalResponse} from "../models/rentals/response/updateRentalResponse";
import {BaseService} from "./baseService";

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
		this.apiUrl = "rentals";
	}
}

export default new RentalService();
