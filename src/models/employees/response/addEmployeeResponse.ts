import { User }  from "../../users/entity/user";

export interface AddEmployeeResponse {
    id: number;
    salary: number;
    user: User;
	createdDate: Date;
	updatedDate: Date;
}
