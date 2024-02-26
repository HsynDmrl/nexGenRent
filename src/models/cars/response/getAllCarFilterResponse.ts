import { Model } from "../../models/entity/model";
import { Color } from "../../colors/entity/color";

export interface GetAllCarFilterResponse {
  kilometer: number;
    id:number;
    colorName: string;
    dailyPrice: number;
    plate: string;
    imagePath: string;
	status: boolean;
    gearType: string;
    fuelType: string;
	modelName: string;
    year:number;
}