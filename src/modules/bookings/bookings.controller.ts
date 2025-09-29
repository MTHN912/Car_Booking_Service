import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { BookingService } from './bookings.services';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';

@ApiTags('Bookings')
@ApiBearerAuth()
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':storeId')
  @ApiOperation({ summary: 'Tạo booking mới cho 1 cửa hàng' })
  @ApiResponse({ status: 201, description: 'Booking đã được tạo thành công' })
  async create(@Request() req, @Param('storeId') storeId: string, @Body() dto: CreateBookingDto) {
    const userId = req.user.userId;
    return this.bookingService.create(dto, userId, storeId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  @ApiOperation({ summary: 'Admin: Lấy tất cả bookings' })
  async findAll() {
    return this.bookingService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  @ApiOperation({ summary: 'Người dùng: Lấy danh sách bookings của chính mình' })
  async findMy(@Request() req) {
    return this.bookingService.findByUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':bookingId/status')
  @ApiOperation({ summary: 'Admin: Cập nhật trạng thái booking' })
  async updateStatus(@Param('bookingId') bookingId: string, @Body() dto: UpdateBookingStatusDto) {
    return this.bookingService.updateStatus(bookingId, dto.status);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':bookingId/cancel')
  @ApiOperation({ summary: 'Người dùng: Hủy booking của chính mình' })
  async cancelBooking(@Param('bookingId') bookingId: string, @Request() req) {
    return this.bookingService.cancelBooking(bookingId, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('users')
  @ApiOperation({ summary: 'Admin: Lấy danh sách người dùng có bookings' })
  async findUsersWithBookings() {
    return this.bookingService.findUsersWithBookings();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('user/:userId')
  @ApiOperation({ summary: 'Admin: Lấy tất cả bookings theo userId' })
  async findByUserId(@Param('userId') userId: string) {
    return this.bookingService.findByUserId(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get(':bookingId')
  @ApiOperation({ summary: 'Admin: Xem chi tiết booking theo bookingId' })
  async findById(@Param('bookingId') bookingId: string) {
    return this.bookingService.findById(bookingId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('store/:storeId')
  @ApiOperation({ summary: 'Admin: Lấy danh sách bookings theo storeId' })
  async findByStoreId(@Param('storeId') storeId: string) {
    return this.bookingService.findByStoreId(storeId);
  }
}
