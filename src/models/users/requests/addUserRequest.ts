import { User } from "../entity/user";
export interface AddUserRequest {
		name: string;
		surname: string;
		email: string;
		nationalityId: string;
		gsm: string;
}