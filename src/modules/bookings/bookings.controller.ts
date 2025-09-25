import { Body, Controller, Post } from '@nestjs/common';
import { BookingService } from './bookings.services';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(@Body() dto: CreateBookingDto) {
    return this.bookingService.create(dto);
  }
}
