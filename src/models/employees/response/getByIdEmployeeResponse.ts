import { User } from '../../users/entity/user';

export interface GetByIdEmployeeResponse {
    id: number;
    salary: number;
    user: User;
	createdDate: Date;
	updatedDate: Date;
}
