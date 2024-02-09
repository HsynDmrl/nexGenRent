import { BaseEntity } from '../../base/entity/baseEntity';
import { Brand } from '../../brands/entity/brand';

export interface Model extends BaseEntity {
    name: string;
    brands?: Brand[];
}
