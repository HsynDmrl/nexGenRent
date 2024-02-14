import { Brand } from "../../brands/entity/brand";

export interface UpdateModelRequest {
	id: number;
    name: string;
    brandId: number;
}