export interface AddInvoiceRequest {
	id: number;
    invoiceNo: string;
    totalPrice: number;
    discountRate: number;
    taxRate: number;
    rentalId: number;
}