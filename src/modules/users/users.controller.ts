import { Body, Controller, Get, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { Roles } from '../../common/decorator/roles.decorator';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../common/guard/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Lấy thông tin người dùng hiện tại' })
  @ApiResponse({ status: 200, description: 'Thông tin user hiện tại' })
  getCurrentUser(@Request() req) {
    return this.usersService.getUserById(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get(':id')
  @ApiOperation({ summary: 'Admin: Lấy thông tin người dùng theo ID' })
  @ApiResponse({ status: 200, description: 'Thông tin user theo ID' })
  @ApiResponse({ status: 403, description: 'Không có quyền truy cập' })
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  @ApiOperation({ summary: 'Admin: Lấy danh sách tất cả người dùng' })
  @ApiResponse({ status: 200, description: 'Danh sách users' })
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  @ApiOperation({ summary: 'Cập nhật thông tin cá nhân' })
  @ApiResponse({ status: 200, description: 'Thông tin user sau khi cập nhật' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  updateCurrentUser(@Request() req, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(req.user.userId, dto);
  }
}
