import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { Roles } from '../../common/decorator/roles.decorator';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../common/guard/roles.guard';
import { CreateStoreDto } from './dto/input/create-store.dto';
import { GetNearbyDto } from './dto/input/get-nearby.dto';
import { UpsertStoreServicesDto } from './dto/input/upsert-store_service.dto';
import { StoreService } from './store.service';
import { ServiceCategory } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Stores')
@ApiBearerAuth()
@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Admin: Tạo cửa hàng mới' })
  @ApiResponse({ status: 201, description: 'Cửa hàng đã được tạo thành công' })
  async create(@Body() dto: CreateStoreDto) {
    return this.storeService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('nearby')
  @ApiOperation({ summary: 'Tìm cửa hàng gần vị trí hiện tại' })
  async findNearby(@Query() query: GetNearbyDto) {
    return this.storeService.findNearby(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-city')
  @ApiOperation({ summary: 'Tìm cửa hàng theo thành phố' })
  async findByCity(@Query('city') city: string) {
    return this.storeService.findByCity(city);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  @ApiOperation({ summary: 'Admin: Lấy danh sách tất cả cửa hàng' })
  async findAll() {
    return this.storeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin cửa hàng theo ID' })
  async findById(@Param('id') id: string) {
    return this.storeService.getById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post(':storeId/services')
  @ApiOperation({ summary: 'Admin: Thêm hoặc cập nhật dịch vụ của cửa hàng' })
  async upsertServices(
    @Param('storeId') storeId: string,
    @Body() dto: Omit<UpsertStoreServicesDto, 'storeId'>,
  ) {
    return this.storeService.upsertServices({ storeId, ...dto });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':storeId/services')
  @ApiOperation({ summary: 'Lấy tất cả dịch vụ của một cửa hàng' })
  async getServicesByStore(@Param('storeId') storeId: string) {
    return this.storeService.getServicesByStore(storeId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':storeId/services/category/:category')
  @ApiOperation({ summary: 'Lấy dịch vụ theo danh mục một cửa hàng' })
  async getServicesByStoreAndCategory(
    @Param('storeId') storeId: string,
    @Param('category') category: ServiceCategory,
  ) {
    return this.storeService.getServicesByStoreAndCategory(storeId, category);
  }
}
