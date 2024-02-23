import { User }  from "../../users/entity/user";

export interface AddCustomerResponse {
    id: number;
    user: User;
	createdDate: Date;
	updatedDate: Date;
}
