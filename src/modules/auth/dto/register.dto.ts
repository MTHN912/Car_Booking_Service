import { IsEmail, IsIn, IsNotEmpty, IsNumberString, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'newuser@yahoo.com',
    description: 'Email duy nhất cho tài khoản',
  })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Mật khẩu tối thiểu 6 ký tự',
  })
  @IsString()
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  password: string;

  @ApiPropertyOptional({
    example: 'Nguyễn Văn Nguyên',
    description: 'Tên hiển thị của người dùng',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'male',
    description: 'male hoặc femail',
    enum: ['male', 'female'],
  })
  @IsOptional()
  @IsIn(['male', 'female'], {
    message: 'Giới tính chỉ được chọn male hoặc female',
  })
  gender?: string;

  @ApiPropertyOptional({
    example: '123 Đường ABC, Quận Tân An, TP.Kanther',
    description: 'Địa chỉ của người dùng',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    example: '0783361874',
    description: 'Số điện thoại',
  })
  @IsOptional()
  @IsNumberString({}, { message: 'Số điện thoại chỉ được chứa số' })
  phoneNumber?: string;
}
