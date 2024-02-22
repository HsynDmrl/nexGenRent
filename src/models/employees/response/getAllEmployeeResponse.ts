import { User } from '../../users/entity/user';

export interface GetAllEmployeeResponse {
    id: number;
    salary: number;
    user: User;
	createdDate: Date;
	updatedDate: Date;
}
