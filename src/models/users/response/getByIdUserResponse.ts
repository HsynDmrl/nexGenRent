import { BaseAddResponse } from "../../base/response/BaseResponse";
import { User } from "../entity/user";

export interface GetByIdUserResponse  {
    name: string;
    surname: string;
    email: string;
    nationalityId: string;
    gsm: string;
    roleName: string;
}
