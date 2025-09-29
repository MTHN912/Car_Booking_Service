import { IsString, IsNumber, IsOptional, IsBoolean, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class UpsertStoreServiceInput {
  @ApiProperty({ example: 'svc_123', description: 'ID của dịch vụ' })
  @IsString()
  serviceId: string;

  @ApiPropertyOptional({ example: 120000, description: 'Giá dịch vụ (VND)' })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ example: 90, description: 'Thời lượng dịch vụ (phút)' })
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiPropertyOptional({ example: true, description: 'Trạng thái dịch vụ (active/inactive)' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpsertStoreServicesDto {
  @ApiProperty({ example: 'store_001', description: 'ID của cửa hàng' })
  @IsString()
  storeId: string;

  @ApiProperty({
    type: [UpsertStoreServiceInput],
    description: 'Danh sách dịch vụ sẽ được thêm/cập nhật cho cửa hàng',
    example: [
      { serviceId: 'svc_123', price: 120000, duration: 90, isActive: true },
      { serviceId: 'svc_456', price: 100000, duration: 60, isActive: false },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpsertStoreServiceInput)
  services: UpsertStoreServiceInput[];
}
