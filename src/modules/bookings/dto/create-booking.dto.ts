import {IsEmail, IsNotEmpty, IsOptional, IsString, IsEnum, IsDateString, IsNumberString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ example: 'Nguyễn Văn A', description: 'Tên khách hàng' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  name: string;

  @ApiProperty({ example: '0912345678', description: 'Số điện thoại' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  phone: string;

  @ApiProperty({ example: 'test@gmail.com', description: 'Email khách hàng' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Toyota Vios 2020', description: 'Mẫu xe' })
  @IsNotEmpty()
  @IsString()
  carModel: string;

  @ApiPropertyOptional({ example: '15000', description: 'Số km đã đi' })
  @IsOptional()
  @IsNumberString()
  km?: string;

  @ApiProperty({ example: '51H-123.45', description: 'Biển số xe' })
  @IsNotEmpty()
  @IsString()
  licensePlate: string;

  @ApiProperty({ example: 'TP.HCM', description: 'Tỉnh/Thành phố' })
  @IsNotEmpty()
  @IsString()
  province: string;

  @ApiProperty({ example: 'Quận 1', description: 'Quận/Huyện' })
  @IsNotEmpty()
  @IsString()
  district: string;

  @ApiProperty({
    enum: ['workshop', 'mobile'],
    example: 'workshop',
    description: 'Loại hình đặt lịch',
  })
  @IsNotEmpty()
  @IsEnum(['workshop', 'mobile'])
  locationType: 'workshop' | 'mobile';

  @ApiProperty({ example: '2025-10-01', description: 'Ngày đặt lịch (YYYY-MM-DD)' })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({ example: '14:00', description: 'Giờ đặt lịch (HH:mm)' })
  @IsNotEmpty()
  @IsString()
  time: string;

  @ApiPropertyOptional({ example: 'Khách muốn rửa xe trước khi bảo dưỡng' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({
    type: [String],
    example: ['serviceId1', 'serviceId2'],
    description: 'Danh sách ID dịch vụ đã chọn',
  })
  @IsOptional()
  services?: string[];
}
