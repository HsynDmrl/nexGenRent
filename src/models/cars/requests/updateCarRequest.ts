export interface UpdateCarRequest {
    id: number;
    kilometer: number;
    year: number;
    dailyPrice: number;
    plate: string;
	isStatus: boolean;
    gearType: string;
    fuelType: string;
	modelId: number;
	colorId: number;
}
