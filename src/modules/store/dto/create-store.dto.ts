import { IsString, IsNumber, IsOptional } from 'class-validator';

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

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
