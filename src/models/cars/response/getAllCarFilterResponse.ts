import { Model } from "../../models/entity/model";
import { Color } from "../../colors/entity/color";

export interface GetAllCarFilterResponse {
  kilometer: number;
    id:number;
    brandName: string;
    dailyPrice: number;
    plate: string;
    imagePath: string;
	status: boolean;
    gearType: string;
    fuelType: string;
	modelName: string;
    colorName: string;
    year:number;
}