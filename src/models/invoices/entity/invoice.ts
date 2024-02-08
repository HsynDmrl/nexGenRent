import { BaseEntity } from '../../base/entity/baseEntity';
import { Rental } from '../../rentals/entity/rental';

export interface Invoice extends BaseEntity{
    invoiceNo: string;
    totalPrice: number;
    discountRate: number;
    taxRate: number;
    rental: Rental;
}