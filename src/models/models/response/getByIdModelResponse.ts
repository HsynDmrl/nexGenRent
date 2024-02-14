import { Brand } from "../../brands/entity/brand";

export interface GetByIdModelResponse {
	id: number;
    name: string;
    brand: Brand;
}
