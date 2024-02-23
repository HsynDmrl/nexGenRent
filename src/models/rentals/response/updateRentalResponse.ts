export interface UpdateRentalResponse {
	id: number;
    startDate: Date;
    endDate: Date;
    returnDate: Date;
    startKilometer: number;
    endKilometer: number;
    totalPrice: number;
    discount: number;
    rentalId: number;
	carId: number;
	customerId: number;
	employeeId: number;
	createdDate: Date;
	updatedDate: Date;
}
