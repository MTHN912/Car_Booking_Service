import { IsString, IsNumber, IsOptional, IsBoolean, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class UpsertStoreServiceInput {
  @IsString()
  serviceId: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpsertStoreServicesDto {
  @IsString()
  storeId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpsertStoreServiceInput)
  services: UpsertStoreServiceInput[];
}
