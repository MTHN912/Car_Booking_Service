import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { RedisModule } from './common/redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookingModule } from './modules/bookings/bookings.module';
import { StoreModule } from './modules/store/store.module';
import { UsersModule } from './modules/users/users.module';
import { ServicesModule } from './modules/car-services/cs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    StoreModule,
    RedisModule,
    BookingModule,
    ServicesModule
  ]
})
export class AppModule {}
