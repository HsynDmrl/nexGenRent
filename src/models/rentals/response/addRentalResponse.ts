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
    carId: number;
    customerId: number;
    employeeId: number;
	createdDate: Date;
	updatedDate: Date;
}
