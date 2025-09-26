import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum ServiceCategory {
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
}

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ServiceCategory, { message: 'danh mục chỉ có thể là BASIC, STANDARD, or PREMIUM' })
  category?: ServiceCategory;
}
