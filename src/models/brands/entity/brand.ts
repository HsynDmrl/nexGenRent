import { BaseEntity } from '../../base/entity/baseEntity';

export interface Brand extends BaseEntity {
  name: string;
  logoPath: string;
}
