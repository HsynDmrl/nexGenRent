import {AddColorRequest} from "../models/colors/requests/addColorRequest";
import {UpdateColorRequest} from "../models/colors/requests/updateColorRequest";
import {AddColorResponse} from "../models/colors/response/addColorResponse";
import {GetAllColorResponse} from "../models/colors/response/getAllColorResponse";
import {GetByIdColorResponse} from "../models/colors/response/getByIdColorResponse";
import {UpdateColorResponse} from "../models/colors/response/updateColorResponse";
import {BaseService} from "./baseService";

class ColorService extends BaseService<
	GetAllColorResponse,
	GetByIdColorResponse,
	AddColorRequest,
	AddColorResponse,
	UpdateColorRequest,
	UpdateColorResponse
> {
	constructor() {
		super();
		this.apiUrl = "colors";
	}
}

export default new ColorService();
