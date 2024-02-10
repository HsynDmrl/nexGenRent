import { BaseAddResponse } from "../../base/response/BaseResponse";
import { User } from "../entity/user";

export interface GetAllUserResponse {
    baseAddResponse: BaseAddResponse;
    users: User[];
}
