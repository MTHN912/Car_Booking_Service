import { Expose } from 'class-transformer';

export class NearbyStoreDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  address: string;

  @Expose()
  latitude: number;

  @Expose()
  longitude: number;

  @Expose()
  distance: number;
}
