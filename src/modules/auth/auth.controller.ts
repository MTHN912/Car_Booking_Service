import { Body, Controller, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { SessionId } from '../../common/decorator/session-id.decorator';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { AuthService } from './auth.service/auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Đăng ký tài khoản mới' })
  @ApiResponse({ status: 201, description: 'Đăng ký thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @HttpCode(200)
  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập hệ thống' })
  @ApiResponse({ status: 200, description: 'Đăng nhập thành công' })
  @ApiResponse({ status: 400, description: 'Email hoặc mật khẩu sai' })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(dto, res);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Làm mới access token' })
  @ApiResponse({ status: 200, description: 'Refresh token thành công' })
  @ApiResponse({ status: 401, description: 'Refresh token không hợp lệ' })
  async refresh(@SessionId() sessionId: string, @Res({ passthrough: true }) res: Response) {
    return this.authService.refresh(sessionId, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Đăng xuất tài khoản' })
  @ApiResponse({ status: 200, description: 'Đăng xuất thành công' })
  @ApiResponse({ status: 401, description: 'Chưa đăng nhập hoặc token không hợp lệ' })
  async logout(@Req() req: any, @SessionId() sessionId: string, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(req.user?.userId, sessionId, res);
  }
}
