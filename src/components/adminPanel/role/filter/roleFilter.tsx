import { useEffect, useState } from 'react';
import { Role } from '../../../../models/roles/entity/role';

const useRoleFilter = (allRoles: Role[], sortBy: string, sortDirection: string,
	 searchId: string, searchName: string, searchCreatedDate: string,
	    searchUpdatedDate: string): Role[] => {
    const [filteredRoles, setFilteredRoles] = useState<Role[]>(allRoles);

    useEffect(() => {
		let result = allRoles.filter(role =>
			(searchId ? role.id.toString().includes(searchId) : true) &&
			(searchName ? role.name.toLowerCase().includes(searchName.toLowerCase()) : true) &&
			(searchCreatedDate ? role.createdDate?.toString().includes(searchCreatedDate) : true) &&
			(searchUpdatedDate ? role.updatedDate?.toString().includes(searchUpdatedDate) : true)
		);

        const sorted = result.sort((a, b) => {
            switch (sortBy) {
				case 'id':
					return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
				case 'name':
					return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
				case 'createdDate':
					return sortDirection === 'asc' ? new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime() : new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
				case 'updatedDate':
					return sortDirection === 'asc' ? new Date(a.updatedDate).getTime() - new Date(b.updatedDate).getTime() : new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime();
				default:
					return 0;
			}
		});

        setFilteredRoles(sorted);
    }, [searchId, searchName,  searchCreatedDate, searchUpdatedDate, allRoles, sortBy, sortDirection]);

    return filteredRoles;
};

export default useRoleFilter;
