export interface AddCarRequest {
    id: number;
    kilometer: number;
    year: number;
    dailyPrice: number;
    plate: string;
    imagePath: string;
	isStatus: boolean;
    gearType: string;
    fuelType: string;
	modelId: number;
	colorId: number;
}
