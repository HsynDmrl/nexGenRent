export interface UpdateUserResponse {
	id: number;
	email: string;
	gsm: string;
	name: string;
	nationalityId: string;
	password: string;
	surname: string;
    roleId: number;
	createdDate: Date;
	updatedDate: Date;
}
