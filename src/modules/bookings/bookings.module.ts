import { Module } from '@nestjs/common';
import { BookingController } from './bookings.controller';
import { BookingService } from './bookings.services'
import { BookingRepository } from './bookings.repository';

@Module({
  controllers: [BookingController],
  providers: [BookingService, BookingRepository],
  exports: [BookingService],
})
export class BookingModule {}
