import { useEffect, useState } from 'react';
import { Color } from '../../../../models/colors/entity/color';

const useColorFilter = (allColors: Color[], sortBy: string, sortDirection: string,
	 searchId: string, searchName: string, searchCreatedDate: string,
	    searchUpdatedDate: string): Color[] => {
    const [filteredColors, setFilteredColors] = useState<Color[]>(allColors);

    useEffect(() => {
		let result = allColors.filter(color =>
			(searchId ? color.id.toString().includes(searchId) : true) &&
			(searchName ? color.name.toLowerCase().includes(searchName.toLowerCase()) : true) &&
			(searchCreatedDate ? color.createdDate?.toString().includes(searchCreatedDate) : true) &&
			(searchUpdatedDate ? color.updatedDate?.toString().includes(searchUpdatedDate) : true)
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

        setFilteredColors(sorted);
    }, [searchId, searchName, searchCreatedDate, searchUpdatedDate, allColors, sortBy, sortDirection]);
	
    return filteredColors;
};

export default useColorFilter;
