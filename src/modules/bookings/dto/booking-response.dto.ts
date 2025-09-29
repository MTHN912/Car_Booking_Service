import { BookingStatus } from '@prisma/client';
import { Expose, Transform, Type } from 'class-transformer';

class UserDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;
}

class StoreDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  address: string;
}

class ServiceDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  price: string;
}

export class BookingResponseDto {
  @Expose()
  id: string;

  @Expose()
  status: BookingStatus;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => UserDto)
  user?: UserDto;

  @Expose()
  @Type(() => StoreDto)
  store?: StoreDto;

  @Expose({ name: 'services' })
    @Transform(({ value }) =>
    value?.map((bs) => ({
        id: bs.service.id,
        name: bs.service.name,
        price: bs.service.price,
    })),
    )
    services?: ServiceDto[];

}
