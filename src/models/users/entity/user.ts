import { Customer } from '../../customers/entity/customer';
import { Employee } from '../../employees/entity/employee';
import { RefreshToken } from '../../refreshTokens/entity/refreshToken';
import { Role } from '../../roles/entity/role';

export interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    nationalityId: string;
    password: string;
    roleName: string;
    role: Role;
    gsm: string;
    customers?: Customer[];
    employees?: Employee[];
    refreshTokens?: RefreshToken[];
}

export interface UsersResponse {
    users: User[]; 
}