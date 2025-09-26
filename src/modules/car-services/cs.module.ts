import { Module } from '@nestjs/common';
import { ServiceController } from './cs.controller';
import { ServiceRepository } from './cs.repository';
import { ServiceService } from './cs.services';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService, ServiceRepository],
})
export class ServicesModule {}
