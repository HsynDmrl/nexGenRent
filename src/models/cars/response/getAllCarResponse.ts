import { Model } from "../../models/entity/model";
import { Color } from "../../colors/entity/color";

export interface GetAllCarResponse {
    id: number;
    kilometer: number;
    year: number;
    dailyPrice: number;
    plate: string;
    imagePath: string;
	status: boolean;
    gearType: string;
    fuelType: string;
	model: Model;
	color: Color;
	createdDate: Date;
	updatedDate: Date;
}
