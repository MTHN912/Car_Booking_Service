import { Expose, Type } from 'class-transformer';

export class ServiceInfoDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description?: string;
}

export class StoreServiceDto {
  @Expose()
  serviceId: string;

  @Expose()
  price?: number;

  @Expose()
  duration?: number;

  @Expose()
  isActive: boolean;

  @Expose()
  @Type(() => ServiceInfoDto)
  service: ServiceInfoDto;
}

export class StoreWithServicesDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  address: string;

  @Expose()
  createdAt: Date;

  @Expose()
  @Type(() => StoreServiceDto)
  services: StoreServiceDto[];
}
