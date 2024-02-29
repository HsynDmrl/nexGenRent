import { useEffect, useState } from 'react';
import { Brand } from '../../../models/brands/entity/brand';

const useBrandFilter = (allBrands: Brand[], sortBy: string, sortDirection: string,
	 searchId: string, searchName: string, searchLogoPath: string, searchCreatedDate: string,
	    searchUpdatedDate: string): Brand[] => {
    const [filteredBrands, setFilteredBrands] = useState<Brand[]>(allBrands);

    useEffect(() => {
		let result = allBrands.filter(brand =>
			(searchId ? brand.id.toString().includes(searchId) : true) &&
			(searchName ? brand.name.toLowerCase().includes(searchName.toLowerCase()) : true) &&
			(searchLogoPath ? brand.logoPath.toLowerCase().includes(searchLogoPath.toLowerCase()) : true) &&
			(searchCreatedDate ? brand.createdDate?.toString().includes(searchCreatedDate) : true) &&
			(searchUpdatedDate ? brand.updatedDate?.toString().includes(searchUpdatedDate) : true)
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

        setFilteredBrands(sorted);
    }, [searchId, searchName, searchLogoPath,  searchCreatedDate, searchUpdatedDate, allBrands, sortBy, sortDirection]);

    return filteredBrands;
};

export default useBrandFilter;
