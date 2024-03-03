import { useEffect, useState } from 'react';
import { Employee } from '../../../../models/employees/entity/employee';

const useEmployeeFilter = (allEmployees: Employee[], sortBy: string, sortDirection: string,
	 searchId: string, searchSalary: number, searchUserName: string, searchCreatedDate: string,
	    searchUpdatedDate: string): Employee[] => {
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(allEmployees);

    useEffect(() => {
				let result = allEmployees.filter(employee =>
					(searchId ? employee.id.toString().includes(searchId) : true) &&
		            (searchSalary ? employee.salary.toString().includes(searchSalary.toString()) : true) &&
					(searchUserName ? employee.user.name.toLowerCase().includes(searchUserName.toLowerCase()) : true) &&
					(searchCreatedDate ? employee.createdDate?.toString().includes(searchCreatedDate) : true) &&
					(searchUpdatedDate ? employee.updatedDate?.toString().includes(searchUpdatedDate) : true)
				);

		const sorted = result.sort((a, b) => {
			switch (sortBy) {
				case 'id':
					return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
				case 'salary':
					return sortDirection === 'asc' ? a.salary - b.salary : b.salary - a.salary;
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
		setFilteredEmployees(sorted);
	}, [searchId, searchSalary, searchUserName, searchCreatedDate, searchUpdatedDate, allEmployees, sortBy, sortDirection]);

    return filteredEmployees;
};

export default useEmployeeFilter;
