import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { BookingService } from './bookings.services';
import { CreateBookingDto } from './dto/create-booking.dto';
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() dto: CreateBookingDto) {
    const userId = req.user.userId;
    return this.bookingService.create(dto, userId);
  }
}
