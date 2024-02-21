import { Rental } from '../../rentals/entity/rental';

export interface Invoice{
	id: number;
    invoiceNo: string;
    totalPrice: number;
    discountRate: number;
    taxRate: number;
    rental: Rental;
	createdDate: Date;
	updatedDate: Date;
}