import { User } from "../../users/entity/user";

export interface GetAllCustomerResponse {
    id: number;
    user: User;
	createdDate: Date;
	updatedDate: Date;
}
