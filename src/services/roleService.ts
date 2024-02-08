import {AddRoleRequest} from "../models/roles/requests/addRoleRequest";
import {UpdateRoleRequest} from "../models/roles/requests/updateRoleRequest";
import {AddRoleResponse} from "../models/roles/response/addRoleResponse";
import {GetAllRoleResponse} from "../models/roles/response/getAllRoleResponse";
import {GetByIdRoleResponse} from "../models/roles/response/getByIdRoleResponse";
import {UpdateRoleResponse} from "../models/roles/response/updateRoleResponse";
import {BaseService} from "./baseService";

class RoleService extends BaseService<
	GetAllRoleResponse,
	GetByIdRoleResponse,
	AddRoleRequest,
	AddRoleResponse,
	UpdateRoleRequest,
	UpdateRoleResponse
> {
	constructor() {
		super();
		this.apiUrl = "roles";
	}
}

export default new RoleService();
