import {AddInvoiceRequest} from "../models/invoices/requests/addInvoiceRequest";
import {UpdateInvoiceRequest} from "../models/invoices/requests/updateInvoiceRequest";
import {AddInvoiceResponse} from "../models/invoices/response/addInvoiceResponse";
import {GetAllInvoiceResponse} from "../models/invoices/response/getAllInvoiceResponse";
import {GetByIdInvoiceResponse} from "../models/invoices/response/getByIdInvoiceResponse";
import {UpdateInvoiceResponse} from "../models/invoices/response/updateInvoiceResponse";
import {BaseService} from "./baseService";

class InvoiceService extends BaseService<
	GetAllInvoiceResponse,
	GetByIdInvoiceResponse,
	AddInvoiceRequest,
	AddInvoiceResponse,
	UpdateInvoiceRequest,
	UpdateInvoiceResponse
> {
	constructor() {
		super();
		this.apiUrl = "invoices";
	}
}

export default new InvoiceService();
