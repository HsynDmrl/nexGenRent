import React from 'react';
import { Button } from 'react-bootstrap';
import { GetAllUserResponse } from '../../../models/users/response/getAllUserResponse';

interface ExportToCSVButtonProps {
    data: GetAllUserResponse[];
    className?: string;
}

const ExportToCSVButton: React.FC<ExportToCSVButtonProps> = ({ data, className }) => {
    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const day = (`0${date.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    };

	const convertToCSV = (users: GetAllUserResponse[]): string => {
		const sortedUsers: GetAllUserResponse[] = [...users].sort((a, b) => a.id - b.id);
	
		const csvRows = ['id,name,email,gsm,nationalityId,surname,role,createdDate,updatedDate'];
		sortedUsers.forEach(({ id, email, gsm, name, nationalityId, surname, role, createdDate, updatedDate }) => {
		  const formattedCreatedDate = createdDate ? formatDate(new Date(createdDate)) : '';
		  const formattedUpdatedDate = updatedDate ? formatDate(new Date(updatedDate)) : '';
		  csvRows.push(`${id},${name.replace(',', ' ')},${email},${gsm},${nationalityId},${surname},${role.name.replace(',', ' ')},${formattedCreatedDate},${formattedUpdatedDate}`);
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
        const filename = `Userler-${formattedDate}.csv`;
        const csvString = convertToCSV(data);
        downloadCSV(csvString, filename);
    };

    return (
        <Button className={`button-admin-user mb-2 ms-1 bg-warning ${className}`} onClick={handleExportClick}>Dışa Aktar</Button>
    );
};

export default ExportToCSVButton;
