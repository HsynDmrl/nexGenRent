import { Car } from "../../cars/entity/car";
import { Customer } from "../../customers/entity/customer";
import { Employee } from "../../employees/entity/employee";

export interface AddRentalResponse {
	id: number;
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
	createdDate: Date;
	updatedDate: Date;
}
