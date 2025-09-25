import { Expose } from 'class-transformer';
import { ServiceCategory } from './create-service.dto';

export class ServiceListDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description?: string;

  @Expose()
  category: ServiceCategory;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
