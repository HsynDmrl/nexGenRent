import { Rental } from "../../rentals/entity/rental";

export interface AddInvoiceResponse {
	id: number;
    invoiceNo: string;
    totalPrice: number;
    discountRate: number;
    taxRate: number;
    rental: Rental;
	createdDate: Date;
	updatedDate: Date;
}
