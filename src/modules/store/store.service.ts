import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateStoreDto } from './dto/create-store.dto';
import { GetNearbyDto } from './dto/get-nearby.dto';
import { NearbyStoreDto } from './dto/nearby-store.dto';
import { StoreRepository } from './store.repository';
import { StoreListDto } from './dto/store-list.dto';

@Injectable()
export class StoreService {
  constructor(private readonly storeRepo: StoreRepository) {}

  async create(dto: CreateStoreDto): Promise<StoreListDto> {
    const { name, street, ward, city, latitude, longitude } = dto;

    const address = [street, ward, city].filter(Boolean).join(', ');

    const store = await this.storeRepo.create({
      name,
      street: street ?? null,
      ward: ward ?? null,
      city: city ?? null,
      latitude,
      longitude,
      address,
    });

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
}
