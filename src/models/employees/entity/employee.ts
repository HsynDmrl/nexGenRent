import { User } from '../../users/entity/user';

export interface Employee {
    id: number;
    salary: number;
    user: User;
	createdDate: Date;
	updatedDate: Date;
}
