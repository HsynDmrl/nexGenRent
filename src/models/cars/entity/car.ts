import { BaseEntity } from '../../base/entity/baseEntity';
import { Model } from '../../models/entity/model';
import { Color } from '../../colors/entity/color';
import { Rental } from '../../rentals/entity/rental';

export interface Car extends BaseEntity {
    kilometer: number;
    year: number;
    dailyPrice: number;
    plate: string;
    imagePath: string;
    gearType: string;
    fuelType: string;
    model: Model;
    color: Color;
    rentals: Rental[];
    logoPath: string;
}
