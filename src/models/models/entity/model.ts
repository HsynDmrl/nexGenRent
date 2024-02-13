import { Brand } from "../../brands/entity/brand";

export interface Model {
	id: number;
    name: string;
	brand: Brand;
}
