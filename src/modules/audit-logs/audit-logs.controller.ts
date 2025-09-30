import { Controller, Get } from '@nestjs/common';
import { AuditLogService } from './audit-logs.service';

@Controller('audit-logs')
export class AuditLogController {
  constructor(private readonly service: AuditLogService) {}

  @Get()
  async findAll() {
    return this.service.getLogs();
  }
}
