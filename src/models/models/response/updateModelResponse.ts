import { Brand } from "../../brands/entity/brand";

export interface UpdateModelResponse {
	id: number;
    name: string;
    brandId: number;
	createdDate: Date;
	updatedDate: Date;
}
