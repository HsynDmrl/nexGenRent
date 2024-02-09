import { BaseEntity } from '../../base/entity/baseEntity';
import { Rental } from '../../rentals/entity/rental';
import { User } from '../../users/entity/user';

export interface Customer extends BaseEntity {
    user: User;
    rentals?: Rental[];
}
