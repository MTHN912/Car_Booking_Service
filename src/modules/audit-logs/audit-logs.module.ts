import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AuditLogController } from './audit-logs.controller';
import { AuditLogRepository } from './audit-logs.repository';
import { AuditLogService } from './audit-logs.service';
import { AuditLogExceptionFilter } from './exception-filters/audit-logs.filter';
import { AuditLogInterceptor } from './interceptor/audit-logs.interceptor';

@Module({
  controllers: [AuditLogController],
  providers: [
    AuditLogRepository,
    AuditLogService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditLogInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AuditLogExceptionFilter,
    },
  ],
  exports: [AuditLogService],
})
export class AuditLogModule {}
