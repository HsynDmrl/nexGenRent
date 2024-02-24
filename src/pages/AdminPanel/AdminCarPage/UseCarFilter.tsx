// useCarFilter.ts
import { useEffect, useState } from 'react';
import { Car } from '../../../models/cars/entity/car';

const useCarFilter = (allCars: Car[], sortBy: string, sortDirection: string, searchId: string, searchKilometer: string, searchYear: string, searchDailyPrice: string, searchPlate: string, searchImagePath: string, searchStatus: string, searchGearType: string, searchFuelType: string, searchModel: string, searchColor: string, searchCreatedDate: string, searchUpdatedDate: string): Car[] => {
    const [filteredCars, setFilteredCars] = useState<Car[]>(allCars);

    useEffect(() => {
        let result = allCars.filter(car =>
            (searchId ? car.id.toString().includes(searchId) : true) &&
            (searchKilometer ? car.kilometer.toString().includes(searchKilometer) : true) &&
            (searchYear ? car.year.toString().includes(searchYear) : true) &&
            (searchDailyPrice ? car.dailyPrice.toString().includes(searchDailyPrice) : true) &&
            (searchPlate ? car.plate.toLowerCase().includes(searchPlate.toLowerCase()) : true) &&
            (searchImagePath ? car.imagePath.toLowerCase().includes(searchImagePath.toLowerCase()) : true) &&
            (searchStatus ? car.status.toString().includes(searchStatus) : true) &&
            (searchGearType ? car.gearType.toLowerCase().includes(searchGearType.toLowerCase()) : true) &&
            (searchFuelType ? car.fuelType.toLowerCase().includes(searchFuelType.toLowerCase()) : true) &&
            (searchModel ? car.model && car.model.name.toLowerCase().includes(searchModel.toLowerCase()) : true) &&
            (searchColor ? car.color && car.color.name.toLowerCase().includes(searchColor.toLowerCase()) : true) &&
            (searchCreatedDate ? car.createdDate?.toString().includes(searchCreatedDate) : true) &&
            (searchUpdatedDate ? car.updatedDate?.toString().includes(searchUpdatedDate) : true)
        );

        const sorted = result.sort((a, b) => {
            switch (sortBy) {
                case 'id':
                    return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
                case 'kilometer':
                    return sortDirection === 'asc' ? a.kilometer - b.kilometer : b.kilometer - a.kilometer;
                case 'year':
                    return sortDirection === 'asc' ? a.year - b.year : b.year - a.year;
                case 'dailyPrice':
                    return sortDirection === 'asc' ? a.dailyPrice - b.dailyPrice : b.dailyPrice - a.dailyPrice;
                case 'plate':
                    return sortDirection === 'asc' ? a.plate.localeCompare(b.plate) : b.plate.localeCompare(a.plate);
                case 'imagePath':
                    return sortDirection === 'asc' ? a.imagePath.localeCompare(b.imagePath) : b.imagePath.localeCompare(a.imagePath);
                case 'isStatus':
                    return sortDirection === 'asc' ? a.status === b.status ? 0 : a.status ? -1 : 1 : b.status === a.status ? 0 : b.status ? -1 : 1;
                case 'gearType':
                    return sortDirection === 'asc' ? a.gearType.localeCompare(b.gearType) : b.gearType.localeCompare(a.gearType);
                case 'fuelType':
                    return sortDirection === 'asc' ? a.fuelType.localeCompare(b.fuelType) : b.fuelType.localeCompare(a.fuelType);
                case 'modelName':
                    return sortDirection === 'asc' ? (a.model && b.model && a.model.name.localeCompare(b.model.name)) : (b.model && a.model && b.model.name.localeCompare(a.model.name));
                case 'colorName':
                    return sortDirection === 'asc' ? (a.color && b.color && a.color.name.localeCompare(b.color.name)) : (b.color && a.color && b.color.name.localeCompare(a.color.name));
                case 'createdDate':
                    return sortDirection === 'asc' ? new Date(a.createdDate ?? "").getTime() - new Date(b.createdDate ?? "").getTime() : new Date(b.createdDate ?? "").getTime() - new Date(a.createdDate ?? "").getTime();
                case 'updatedDate':
                    return sortDirection === 'asc' ? new Date(a.updatedDate ?? "").getTime() - new Date(b.updatedDate ?? "").getTime() : new Date(b.updatedDate ?? "").getTime() - new Date(a.updatedDate ?? "").getTime();
                default:
                    return 0;
            }
        });

        setFilteredCars(sorted);
    }, [searchId, searchKilometer, searchYear, searchDailyPrice, searchPlate, searchImagePath, searchStatus, searchGearType, searchFuelType, searchModel, searchColor, searchCreatedDate, searchUpdatedDate, allCars, sortBy, sortDirection]);

    return filteredCars;
};

export default useCarFilter;
