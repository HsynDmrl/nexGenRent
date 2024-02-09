import { BaseEntity } from '../../base/entity/baseEntity';
import { Car } from '../../cars/entity/car';
import { Customer } from '../../customers/entity/customer';
import { Employee } from '../../employees/entity/employee';
import { Invoice } from '../../invoices/entity/invoice';

export interface Rental extends BaseEntity {
    startDate: Date;
    endDate: Date;
    returnDate: Date;
    startKilometer: number;
    endKilometer: number;
    totalPrice: number;
    discount: number;
    car: Car;
    customer: Customer;
    employee: Employee;
    invoices?: Invoice[];
}
