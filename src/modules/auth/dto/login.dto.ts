import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'user1@example.com',
    description: 'Địa chỉ email để đăng nhập',
  })
  @IsEmail({}, { message: 'Tài khoản hoặc mật khẩu không chính xác' })
  @IsNotEmpty({ message: 'Tài khoản hoặc mật khẩu không chính xác' })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Mật khẩu tối thiểu 6 ký tự',
  })
  @IsString()
  @MinLength(6, { message: 'Tài khoản hoặc mật khẩu không chính xác' })
  @IsNotEmpty({ message: 'Tài khoản hoặc mật khẩu không chính xác' })
  password: string;
}
