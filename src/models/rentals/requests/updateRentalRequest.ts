export interface UpdateRentalRequest {
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
}