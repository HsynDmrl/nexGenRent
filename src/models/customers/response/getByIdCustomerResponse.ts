import { User } from "../../users/entity/user";

export interface GetByIdCustomerResponse {
    id: number;
    user: User;
	createdDate: Date;
	updatedDate: Date;
}
