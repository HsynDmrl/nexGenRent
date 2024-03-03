import { useEffect, useState } from 'react';
import { User } from '../../../../models/users/entity/user';

const useUserFilter = (allUsers: User[], sortBy: string, sortDirection: string,
	searchId: string,searchEmail: string, searchGsm: string, searchName: string,
    searchNationalityId: string, searchSurname: string, searchRole: string, searchCreatedDate: string,
	searchUpdatedDate: string): User[] => {
    const [filteredUsers, setFilteredUsers] = useState<User[]>(allUsers);

    useEffect(() => {
		let result = allUsers.filter(user =>
			(searchId ? user.id.toString().includes(searchId) : true) &&
            (searchEmail ? user.email.toLowerCase().includes(searchEmail.toLowerCase()) : true) &&
            (searchGsm ? user.gsm.toLowerCase().includes(searchGsm.toLowerCase()) : true) &&
			(searchName ? user.name.toLowerCase().includes(searchName.toLowerCase()) : true) &&
            (searchNationalityId ? user.nationalityId.toLowerCase().includes(searchNationalityId.toLowerCase()) : true) && 
            (searchSurname ? user.surname.toLowerCase().includes(searchSurname.toLowerCase()) : true) &&
            (searchRole ? user.role && user.role.name.toLowerCase().includes(searchRole.toLowerCase()) : true) &&
			(searchCreatedDate ? user.createdDate?.toString().includes(searchCreatedDate) : true) &&
			(searchUpdatedDate ? user.updatedDate?.toString().includes(searchUpdatedDate) : true)
		);

		const sorted = result.sort((a, b) => {
			switch (sortBy) {
				case 'id':
					return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
                case 'email':
                    return sortDirection === 'asc' ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email);
                case 'gsm':
                    return sortDirection === 'asc' ? a.gsm.localeCompare(b.gsm) : b.gsm.localeCompare(a.gsm);
				case 'name':
					return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
                case 'nationalityId':
                    return sortDirection === 'asc' ? a.nationalityId.localeCompare(b.nationalityId) : b.nationalityId.localeCompare(a.nationalityId);
                case 'surname':
                    return sortDirection === 'asc' ? a.surname.localeCompare(b.surname) : b.surname.localeCompare(a.surname);
				case 'roleName':
					return sortDirection === 'asc' ? (a.role && b.role && a.role.name.localeCompare(b.role.name)) : (b.role && a.role && b.role.name.localeCompare(a.role.name));
				case 'createdDate':
					return sortDirection === 'asc' ? new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime() : new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
				case 'updatedDate':
					return sortDirection === 'asc' ? new Date(a.updatedDate).getTime() - new Date(b.updatedDate).getTime() : new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime();
				default:
					return 0;
			}
		});
		setFilteredUsers(sorted);
	}, [searchId, searchEmail, searchGsm, searchName, searchNationalityId, searchSurname, 
        searchRole, searchCreatedDate, searchUpdatedDate, allUsers, sortBy, sortDirection]);
    return filteredUsers;
};

export default useUserFilter;
