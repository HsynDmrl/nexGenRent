import { Role } from '../../roles/entity/role';

export interface User {
    id: number;
    email: string;
    gsm: string;
    name: string;
    nationalityId: string;
    password: string;
    surname: string;
    role: Role;
	createdDate: Date;
	updatedDate: Date;
}