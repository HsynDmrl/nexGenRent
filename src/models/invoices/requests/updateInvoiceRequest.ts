export interface UpdateInvoiceRequest  {
	id: number;
    invoiceNo: string;
    totalPrice: number;
    discountRate: number;
    taxRate: number;
    rentalId: number;
}