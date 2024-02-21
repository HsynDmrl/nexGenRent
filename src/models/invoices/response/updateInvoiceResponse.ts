import { Rental } from "../../rentals/entity/rental";

export interface UpdateInvoiceResponse {
	id: number;
    invoiceNo: string;
    totalPrice: number;
    discountRate: number;
    taxRate: number;
    rentalId: number;
	createdDate: Date;
	updatedDate: Date;
}
