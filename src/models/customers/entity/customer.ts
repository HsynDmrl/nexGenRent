import { User } from '../../users/entity/user';

export interface Customer  {
    id: number;
    user: User;
	createdDate: Date;
	updatedDate: Date;
}
