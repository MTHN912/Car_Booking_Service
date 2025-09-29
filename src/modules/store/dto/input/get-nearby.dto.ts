import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetNearbyDto {
  @ApiProperty({
    example: 10.762622,
    description: 'Vĩ độ hiện tại của người dùng',
  })
  @Type(() => Number)
  @IsNumber()
  latitude: number;

  @ApiProperty({
    example: 106.660172,
    description: 'Kinh độ hiện tại của người dùng',
  })
  @Type(() => Number)
  @IsNumber()
  longitude: number;

  @ApiProperty({
    example: 5000,
    description: 'Bán kính tìm kiếm (tính bằng mét)',
  })
  @Type(() => Number)
  @IsNumber()
  radius: number;
}
