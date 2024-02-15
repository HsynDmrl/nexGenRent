import { BaseAddResponse } from "../../base/response/BaseResponse";
import { User } from "../entity/user";

export interface GetByIdUserResponse  {
	id: number;
    name: string;
    surname: string;
    email: string;
    nationalityId: string;
    password: string;
    gsm: string;
    roleName: string;
}