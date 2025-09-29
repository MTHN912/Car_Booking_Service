import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ServiceCategory {
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
}

export class CreateServiceDto {
  @ApiProperty({
    example: 'Đập phá xe',
    description: 'Tên dịch vụ',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'Dịch vụ phá xe trong 30 phút',
    description: 'Mô tả dịch vụ',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    enum: ServiceCategory,
    example: ServiceCategory.BASIC,
    description: 'Danh mục dịch vụ (BASIC, STANDARD, PREMIUM)',
  })
  @IsOptional()
  @IsEnum(ServiceCategory, { message: 'danh mục chỉ có thể là BASIC, STANDARD, or PREMIUM' })
  category?: ServiceCategory;
}
