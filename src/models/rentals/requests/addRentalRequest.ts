export interface AddRentalRequest {
	id: number;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    returnDate: Date;
    startKilometer: number;
    endKilometer: number;
    discount: number;
    carId: number;
    customerId: number;
    employeeId: number;
}