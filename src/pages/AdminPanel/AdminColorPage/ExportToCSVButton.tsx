import React from 'react';
import { Button } from 'react-bootstrap';
import { GetAllColorResponse } from '../../../models/colors/response/getAllColorResponse';

interface ExportToCSVButtonProps {
    data: GetAllColorResponse[];
    className?: string;
}

const ExportToCSVButton: React.FC<ExportToCSVButtonProps> = ({ data, className }) => {
    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const day = (`0${date.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    };

	const convertToCSV = (colors: GetAllColorResponse[]): string => {
		const sortedColors: GetAllColorResponse[] = [...colors].sort((a, b) => a.id - b.id);
	
		const csvRows = ['id,name,createdDate,updatedDate'];
		sortedColors.forEach(({ id, name, createdDate, updatedDate }) => {
			const formattedCreatedDate = createdDate ? formatDate(new Date(createdDate)) : '';
			const formattedUpdatedDate = updatedDate ? formatDate(new Date(updatedDate)) : '';
			csvRows.push(`${id},${name.replace(',', ' ')},${formattedCreatedDate},${formattedUpdatedDate}`);
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
        const filename = `Renkler-${formattedDate}.csv`;
        const csvString = convertToCSV(data);
        downloadCSV(csvString, filename);
    };

    return (
        <Button className={`button-admin-color mb-2 ms-1 bg-warning ${className}`} onClick={handleExportClick}>Dışa Aktar</Button>
    );
};

export default ExportToCSVButton;
