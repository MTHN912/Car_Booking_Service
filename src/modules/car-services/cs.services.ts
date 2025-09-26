import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ServiceRepository } from './cs.repository';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServiceListDto } from './dto/service-response.dto';
import { ServiceCategory } from '@prisma/client';

@Injectable()
export class ServiceService {
  constructor(private readonly serviceRepo: ServiceRepository) {}

  async create(dto: CreateServiceDto): Promise<ServiceListDto> {
    const service = await this.serviceRepo.create({
      name: dto.name,
      description: dto.description ?? null,
      category: dto.category ?? 'BASIC',
    });

    return plainToInstance(ServiceListDto, service, {
      excludeExtraneousValues: true,
    });
  }

  async getAll(): Promise<ServiceListDto[]> {
    const services = await this.serviceRepo.findAll();

    return plainToInstance(ServiceListDto, services, {
      excludeExtraneousValues: true,
    });
  }

  async getByCategory(category: ServiceCategory): Promise<ServiceListDto[]> {
    const services = await this.serviceRepo.findByCategory(category);

    return plainToInstance(ServiceListDto, services, {
      excludeExtraneousValues: true,
    });
  }
}
