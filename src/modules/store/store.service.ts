import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateStoreDto } from './dto/input/create-store.dto';
import { GetNearbyDto } from './dto/input/get-nearby.dto';
import { UpsertStoreServicesDto } from './dto/input/upsert-store_service.dto';
import { NearbyStoreDto } from './dto/response/nearby-store.dto';
import { StoreListDto } from './dto/response/store-list.dto';
import { StoreServiceDto, StoreWithServicesDto } from './dto/response/upsert-store-response.dto';
import { StoreRepository } from './store.repository';
@Injectable()
export class StoreService {
  constructor(private readonly storeRepo: StoreRepository) {}

  async create(dto: CreateStoreDto): Promise<StoreListDto> {
    const { name, street, ward, city, latitude, longitude, services } = dto;

    const address = [street, ward, city].filter(Boolean).join(', ');

    const store = await this.storeRepo.createWithServices(
      {
        name,
        street: street ?? null,
        ward: ward ?? null,
        city: city ?? null,
        latitude,
        longitude,
        address,
      },
      services,
    );

    return plainToInstance(StoreListDto, store, {
      excludeExtraneousValues: true,
    });
  }

  async findNearby(query: GetNearbyDto) {
    const { latitude, longitude, radius } = query;
    const stores = await this.storeRepo.findNearby(latitude, longitude, radius);

    return plainToInstance(NearbyStoreDto, stores, {
      excludeExtraneousValues: true,
    });
  }

  async findByCity(city: string) {
    const stores = await this.storeRepo.findByCity(city);

    return plainToInstance(NearbyStoreDto, stores, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const stores = await this.storeRepo.findAll();
      return plainToInstance(StoreListDto, stores, {
      excludeExtraneousValues: true,
    });
  }

  async getById(id: string): Promise<StoreListDto> {
    const store = await this.storeRepo.findById(id);
    if (!store) {
      throw new Error('Store not found');
    }

    return plainToInstance(StoreListDto, store, {
      excludeExtraneousValues: true,
    });
  }

  async upsertServices(dto: UpsertStoreServicesDto): Promise<StoreWithServicesDto> {
    const { storeId, services } = dto;

    const store = await this.storeRepo.upsertServicesForStore(storeId, services);

    return plainToInstance(StoreWithServicesDto, store, {
      excludeExtraneousValues: true,
    });
  }

  async getServicesByStore(storeId: string): Promise<StoreServiceDto[]> {
    const services = await this.storeRepo.getServicesByStoreId(storeId);

    return plainToInstance(StoreServiceDto, services, {
      excludeExtraneousValues: true,
    });
  }
}
