import React from 'react';
import { Button } from 'react-bootstrap';
import { GetAllRentalResponse } from '../../../models/rentals/response/getAllRentalResponse';

interface ExportToCSVButtonProps {
	data: GetAllRentalResponse[];
	className?: string;
}

const ExportToCSVButton: React.FC<ExportToCSVButtonProps> = ({ data, className }) => {
	const formatDate = (date: Date): string => {
		const year = date.getFullYear();
		const month = (`0${date.getMonth() + 1}`).slice(-2);
		const day = (`0${date.getDate()}`).slice(-2);
		return `${year}-${month}-${day}`;
	};

	const convertToCSV = (rentals: GetAllRentalResponse[]): string => {
		const sortedRentals: GetAllRentalResponse[] = [...rentals].sort((a, b) => a.id - b.id);
	
		const csvRows = ['id,startDate,endDate,returnDate,startKilometer,endKilometer,totalPrice,discount,car,customer,employee,createdDate,updatedDate'];
		sortedRentals.forEach(({ id, startDate, endDate, returnDate, startKilometer, endKilometer, totalPrice, discount, car, customer, employee, createdDate, updatedDate }) => {
			const formattedStartDate = startDate ? formatDate(new Date(startDate)) : '';
			const formattedEndDate = endDate ? formatDate(new Date(endDate)) : '';
			const formattedReturnDate = returnDate ? formatDate(new Date(returnDate)) : '';
			const formattedCreatedDate = createdDate ? formatDate(new Date(createdDate)) : '';
			const formattedUpdatedDate = updatedDate ? formatDate(new Date(updatedDate)) : '';
			const carPlate = car ? car.plate : '';
			const customerName = customer && customer.user ? customer.user.name.replace(',', ' ') : '';
			const employeeName = employee && employee.user ? employee.user.name.replace(',', ' ') : '';
	
			csvRows.push(`${id},${formattedStartDate},${formattedEndDate},${formattedReturnDate},${startKilometer},${endKilometer},${totalPrice},${discount},${carPlate},${customerName},${employeeName},${formattedCreatedDate},${formattedUpdatedDate}`);
		});
		return csvRows.join('\n');
	};
	

	const downloadCSV = (csvString: string, filename: string): void => {
		const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = filename;
		link.click();
		URL.revokeObjectURL(link.href);
	};

	const handleExportClick = (): void => {
		const today = new Date();
		const formattedDate = formatDate(today);
		const filename = `Siparisler-${formattedDate}.csv`;
		const csvString = convertToCSV(data);
		downloadCSV(csvString, filename);
	};

	return (
		<Button className={`button-admin-rental mb-2 ms-1 bg-warning ${className}`} onClick={handleExportClick}>Dışa Aktar</Button>
	);
};

export default ExportToCSVButton;
