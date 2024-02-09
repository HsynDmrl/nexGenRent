import { BaseEntity } from '../../base/entity/baseEntity';
import { Rental } from '../../rentals/entity/rental';
import { User } from '../../users/entity/user';

export interface Employee extends BaseEntity{
    salary: number;
    user: User;
    rentals?: Rental[];
}
