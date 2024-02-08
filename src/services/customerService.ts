import {AddCustomerRequest} from "../models/customers/requests/addCustomerRequest";
import {UpdateCustomerRequest} from "../models/customers/requests/updateCustomerRequest";
import {AddCustomerResponse} from "../models/customers/response/addCustomerResponse";
import {GetAllCustomerResponse} from "../models/customers/response/getAllCustomerResponse";
import {GetByIdCustomerResponse} from "../models/customers/response/getByIdCustomerResponse";
import {UpdateCustomerResponse} from "../models/customers/response/updateCustomerResponse";
import {BaseService} from "./baseService";

class CustomerService extends BaseService<
	GetAllCustomerResponse,
	GetByIdCustomerResponse,
	AddCustomerRequest,
	AddCustomerResponse,
	UpdateCustomerRequest,
	UpdateCustomerResponse
> {
	constructor() {
		super();
		this.apiUrl = "customers";
	}
}

export default new CustomerService();
