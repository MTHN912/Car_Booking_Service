import { IsString, IsOptional, IsLatitude, IsLongitude, ValidateNested, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class StoreServiceInput {
  @ApiProperty({ example: 'cmfz2rwsl0000t5gc29o8yt0d', description: 'ID của dịch vụ' })
  @IsString()
  serviceId: string;

  @ApiPropertyOptional({ example: 100000, description: 'Giá dịch vụ (VND)' })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ example: 60, description: 'Thời lượng dịch vụ (phút)' })
  @IsOptional()
  @IsNumber()
  duration?: number;
}

export class CreateStoreDto {
  @ApiProperty({ example: 'Cửa hàng A', description: 'Tên cửa hàng' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: '123 Nguyễn Trãi', description: 'Địa chỉ đường' })
  @IsOptional()
  @IsString()
  street?: string;

  @ApiPropertyOptional({ example: 'Phường 1', description: 'Phường/xã' })
  @IsOptional()
  @IsString()
  ward?: string;

  @ApiPropertyOptional({ example: 'Hồ Chí Minh', description: 'Thành phố' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: 10.762622, description: 'Vĩ độ của cửa hàng' })
  @IsLatitude()
  latitude: number;

  @ApiProperty({ example: 106.660172, description: 'Kinh độ của cửa hàng' })
  @IsLongitude()
  longitude: number;

  @ApiProperty({
    type: [StoreServiceInput],
    description: 'Danh sách dịch vụ mà cửa hàng cung cấp',
    example: [
      { serviceId: 'cmfywcix10009t51sojolt1pj', price: 100000, duration: 60 },
      { serviceId: 'cmfywbamr0007t51su4j0das0', price: 150000, duration: 90 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StoreServiceInput)
  services: StoreServiceInput[];
}
