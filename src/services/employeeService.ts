import {AddEmployeeRequest} from "../models/employees/requests/addEmployeeRequest";
import {UpdateEmployeeRequest} from "../models/employees/requests/updateEmployeeRequest";
import {AddEmployeeResponse} from "../models/employees/response/addEmployeeResponse";
import {GetAllEmployeeResponse} from "../models/employees/response/getAllEmployeeResponse";
import {GetByIdEmployeeResponse} from "../models/employees/response/getByIdEmployeeResponse";
import {UpdateEmployeeResponse} from "../models/employees/response/updateEmployeeResponse";
import {BaseService} from "./baseService";

class EmployeeService extends BaseService<
	GetAllEmployeeResponse,
	GetByIdEmployeeResponse,
	AddEmployeeRequest,
	AddEmployeeResponse,
	UpdateEmployeeRequest,
	UpdateEmployeeResponse
> {
	constructor() {
		super();
		this.apiUrl = "employees";
	}
}

export default new EmployeeService();
