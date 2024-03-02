import { useEffect, useState } from 'react';
import { Customer } from '../../../../models/customers/entity/customer';

const useCustomerFilter = (allCustomers: Customer[], sortBy: string, sortDirection: string,
	 searchId: string, searchUserName: string, searchCreatedDate: string,
	    searchUpdatedDate: string): Customer[] => {
    const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(allCustomers);

    useEffect(() => {
		let result = allCustomers.filter(customer =>
			(searchId ? customer.id.toString().includes(searchId) : true) &&
			(searchUserName ? customer.user.name.toLowerCase().includes(searchUserName.toLowerCase()) : true) &&
			(searchCreatedDate ? customer.createdDate?.toString().includes(searchCreatedDate) : true) &&
			(searchUpdatedDate ? customer.updatedDate?.toString().includes(searchUpdatedDate) : true)
		);

		const sorted = result.sort((a, b) => {
			switch (sortBy) {
				case 'id':
					return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
				case 'userName':
					return sortDirection === 'asc' ? a.user.name.localeCompare(b.user.name) : b.user.name.localeCompare(a.user.name);
				case 'createdDate':
					return sortDirection === 'asc' ? new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime() : new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
				case 'updatedDate':
					return sortDirection === 'asc' ? new Date(a.updatedDate).getTime() - new Date(b.updatedDate).getTime() : new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime();
				default:
					return 0;
			}
		});
		setFilteredCustomers(sorted);
	}, [searchId, searchUserName, searchCreatedDate, searchUpdatedDate, allCustomers, sortBy, sortDirection]);

    return filteredCustomers;
};

export default useCustomerFilter;
