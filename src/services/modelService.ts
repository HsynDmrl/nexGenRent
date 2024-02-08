import {AddModelRequest} from "../models/models/requests/addModelRequest";
import {UpdateModelRequest} from "../models/models/requests/updateModelRequest";
import {AddModelResponse} from "../models/models/response/addModelResponse";
import {GetAllModelResponse} from "../models/models/response/getAllModelResponse";
import {GetByIdModelResponse} from "../models/models/response/getByIdModelResponse";
import {UpdateModelResponse} from "../models/models/response/updateModelResponse";
import {BaseService} from "./baseService";

class ModelService extends BaseService<
	GetAllModelResponse,
	GetByIdModelResponse,
	AddModelRequest,
	AddModelResponse,
	UpdateModelRequest,
	UpdateModelResponse
> {
	constructor() {
		super();
		this.apiUrl = "models";
	}
}

export default new ModelService();
