import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ServiceCategory } from '@prisma/client';
import { Roles } from '../../common/decorator/roles.decorator';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../common/guard/roles.guard';
import { ServiceService } from './cs.services';
import { CreateServiceDto } from './dto/create-service.dto';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  async create(@Body() dto: CreateServiceDto) {
    return this.serviceService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('category/:category')
  async getByCategory(@Param('category') category: string) {
    return this.serviceService.getByCategory(category as ServiceCategory);
  }

  @Get()
  async getAll() {
    return this.serviceService.getAll();
  }
}
