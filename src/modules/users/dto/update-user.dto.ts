import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Nguyen Van A', description: 'Tên người dùng' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'male', description: 'Giới tính (male hoặc female)' })
  @IsOptional()
  @IsIn(['male', 'female'], {
    message: 'Giới tính chỉ được chọn male hoặc female',
  })
  gender?: string;

  @ApiPropertyOptional({ example: '123 Đường ABC, Quận 1', description: 'Địa chỉ liên hệ' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: '0987654321', description: 'Số điện thoại người dùng' })
  @IsOptional()
  @IsNumberString({}, { message: 'Số điện thoại chỉ được chứa số' })
  phoneNumber?: string;
}
