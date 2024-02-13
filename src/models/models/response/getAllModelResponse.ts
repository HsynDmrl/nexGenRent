import { Brand } from "../../brands/entity/brand";

export interface GetAllModelResponse {
	id: number;
    name: string;
    brand: Brand;
}