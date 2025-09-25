import {IsEmail, IsNotEmpty, IsOptional, IsString, IsEnum, IsDateString, IsNumberString, MaxLength } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  storeId: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  carModel: string;

  @IsOptional()
  @IsNumberString()
  km?: string;

  @IsNotEmpty()
  @IsString()
  licensePlate: string;

  @IsNotEmpty()
  @IsString()
  province: string;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsNotEmpty()
  @IsEnum(['workshop', 'mobile'])
  locationType: 'workshop' | 'mobile';

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsString()
  time: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  services?: string[];
}
