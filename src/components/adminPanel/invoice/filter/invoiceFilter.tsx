import { useEffect, useState } from 'react';
import { Invoice } from '../../../../models/invoices/entity/invoice';

const useInvoiceFilter = (allInvoices: Invoice[], sortBy: string, sortDirection: string,
	searchId: string,searchInvoiceNo:string,searchTotalPrice:string,searchDiscountRate:string,
    searchTaxRate:string, setSearchRental: string, searchCreatedDate: string, searchUpdatedDate: string): Invoice[] => {
    const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(allInvoices);

    useEffect(() => {
		let result = allInvoices.filter(invoice =>
			(searchId ? invoice.id.toString().includes(searchId) : true) &&
			(searchInvoiceNo ? invoice.invoiceNo?.includes(searchInvoiceNo) : true) &&
			(searchTotalPrice ? invoice.totalPrice?.toString().includes(searchTotalPrice) : true) &&
			(searchDiscountRate ? invoice.discountRate?.toString().includes(searchDiscountRate) : true) &&
			(searchTaxRate ? invoice.taxRate?.toString().includes(searchTaxRate) : true) &&
			(setSearchRental ? invoice.rental?.id?.toString().includes(setSearchRental) : true) &&
			(searchCreatedDate ? invoice.createdDate?.toString().includes(searchCreatedDate) : true) &&
			(searchUpdatedDate ? invoice.updatedDate?.toString().includes(searchUpdatedDate) : true)
		);

		const sorted = result.sort((a, b) => {
			switch (sortBy) {
				case 'id':
					return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
				case 'invoiceNo':
					return sortDirection === 'asc' ? a.invoiceNo?.localeCompare(b.invoiceNo ?? '') : b.invoiceNo?.localeCompare(a.invoiceNo ?? '');
				case 'totalPrice':
					return sortDirection === 'asc' ? a.totalPrice - b.totalPrice : b.totalPrice - a.totalPrice;
				case 'discountRate':
					return sortDirection === 'asc' ? a.discountRate - b.discountRate : b.discountRate - a.discountRate;
				case 'taxRate':
					return sortDirection === 'asc' ? a.taxRate - b.taxRate : b.taxRate - a.taxRate;
				case 'rentalId':
					return sortDirection === 'asc' ? (a.rental && b.rental && a.rental.id - b.rental.id) : (b.rental && a.rental && b.rental.id - a.rental.id);
				case 'createdDate':
					return sortDirection === 'asc' ? new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime() : new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
				case 'updatedDate':
					return sortDirection === 'asc' ? new Date(a.updatedDate).getTime() - new Date(b.updatedDate).getTime() : new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime();
				default:
					return 0;
			}
		});
		setFilteredInvoices(sorted);
	}, [searchId, searchInvoiceNo, searchTotalPrice, searchDiscountRate, searchTaxRate,
        setSearchRental, searchCreatedDate, searchUpdatedDate, allInvoices, sortBy, sortDirection]);

    return filteredInvoices;
};

export default useInvoiceFilter;
