import { IsEnum } from 'class-validator';
import { BookingStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookingStatusDto {
  @ApiProperty({
    enum: BookingStatus,
    example: BookingStatus.CONFIRMED,
    description: 'Trạng thái mới của booking',
  })
  @IsEnum(BookingStatus)
  status: BookingStatus;
}
