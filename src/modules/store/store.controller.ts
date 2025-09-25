import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { Roles } from '../../common/decorator/roles.decorator';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../common/guard/roles.guard';
import { CreateStoreDto } from './dto/input/create-store.dto';
import { GetNearbyDto } from './dto/input/get-nearby.dto';
import { UpsertStoreServicesDto } from './dto/input/upsert-store_service.dto';
import { StoreService } from './store.service';


@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  async create(@Body() dto: CreateStoreDto) {
    return this.storeService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('nearby')
  async findNearby(@Query() query: GetNearbyDto) {
    return this.storeService.findNearby(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-city')
  async findByCity(@Query('city') city: string) {
    return this.storeService.findByCity(city);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  async findAll() {
    return this.storeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.storeService.getById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post(':storeId/services')
  async upsertServices(
    @Param('storeId') storeId: string,
    @Body() dto: Omit<UpsertStoreServicesDto, 'storeId'>,
  ) {
    return this.storeService.upsertServices({ storeId, ...dto });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':storeId/services')
  async getServicesByStore(@Param('storeId') storeId: string) {
    return this.storeService.getServicesByStore(storeId);
  }
}
