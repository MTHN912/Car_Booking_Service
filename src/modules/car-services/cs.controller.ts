import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ServiceCategory } from '@prisma/client';
import { Roles } from '../../common/decorator/roles.decorator';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../common/guard/roles.guard';
import { ServiceService } from './cs.services';
import { CreateServiceDto } from './dto/create-service.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Services')
@ApiBearerAuth()
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Admin: Tạo dịch vụ mới' })
  @ApiResponse({ status: 201, description: 'Dịch vụ đã được tạo thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  async create(@Body() dto: CreateServiceDto) {
    return this.serviceService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('category/:category')
  @ApiOperation({ summary: 'Admin: Lấy danh sách dịch vụ theo danh mục' })
  @ApiResponse({ status: 200, description: 'Danh sách dịch vụ theo danh mục' })
  async getByCategory(@Param('category') category: string) {
    return this.serviceService.getByCategory(category as ServiceCategory);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @ApiOperation({ summary: 'Admin: Lấy tất cả dịch vụ' })
  @ApiResponse({ status: 200, description: 'Danh sách tất cả dịch vụ' })
  async getAll() {
    return this.serviceService.getAll();
  }
}
