import { Brand } from "../../brands/entity/brand";

export interface AddModelResponse {
	id: number;
    name: string;
    brand: Brand;
	createdDate: Date;
	updatedDate: Date;
}
