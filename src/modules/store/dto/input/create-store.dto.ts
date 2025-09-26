import { IsString, IsOptional, IsLatitude, IsLongitude, ValidateNested, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class StoreServiceInput {
  @IsString()
  serviceId: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  duration?: number;
}
export class CreateStoreDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  ward?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StoreServiceInput)
  services: StoreServiceInput[];
}
