import { useEffect, useState } from 'react';
import { Model } from '../../../../models/models/entity/model';

const useModelFilter = (allModels: Model[], sortBy: string, sortDirection: string,
	 searchId: string, searchName: string, searchBrand: string, searchCreatedDate: string,
	    searchUpdatedDate: string): Model[] => {
    const [filteredModels, setFilteredModels] = useState<Model[]>(allModels);

    useEffect(() => {
		let result = allModels.filter(model =>
			(searchId ? model.id.toString().includes(searchId) : true) &&
			(searchName ? model.name.toLowerCase().includes(searchName.toLowerCase()) : true) &&
            (searchBrand ? model.brand && model.brand.name.toLowerCase().includes(searchBrand.toLowerCase()) : true) &&
			(searchCreatedDate ? model.createdDate?.toString().includes(searchCreatedDate) : true) &&
			(searchUpdatedDate ? model.updatedDate?.toString().includes(searchUpdatedDate) : true)
		);

		const sorted = result.sort((a, b) => {
			switch (sortBy) {
				case 'id':
					return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
				case 'name':
					return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
				case 'brandName':
					return sortDirection === 'asc' ? (a.brand && b.brand && a.brand.name.localeCompare(b.brand.name)) : (b.brand && a.brand && b.brand.name.localeCompare(a.brand.name));
				case 'createdDate':
					return sortDirection === 'asc' ? new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime() : new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
				case 'updatedDate':
					return sortDirection === 'asc' ? new Date(a.updatedDate).getTime() - new Date(b.updatedDate).getTime() : new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime();
				default:
					return 0;
			}
		});
		setFilteredModels(sorted);
	}, [searchId, searchName, searchBrand, searchCreatedDate, searchUpdatedDate, allModels, sortBy, sortDirection]);

    return filteredModels;
};

export default useModelFilter;
