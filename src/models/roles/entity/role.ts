import { BaseEntity } from '../../base/entity/baseEntity';
import { User } from '../../users/entity/user';

export interface Role extends BaseEntity {
    name: string;
    users?: User[];
}
