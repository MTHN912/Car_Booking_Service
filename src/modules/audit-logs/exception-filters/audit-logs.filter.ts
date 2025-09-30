import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { AuditLogService } from '../audit-logs.service';

@Catch()
export class AuditLogExceptionFilter implements ExceptionFilter {
  constructor(private readonly auditLogService: AuditLogService) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : (exception as any).message;

    await this.auditLogService.logError({
      actorId: request.user?.userId ?? null,
      action: request.method,
      model: request.route?.path ?? 'Unknown',
      entityId: request.params?.id ?? null,
      ip: request.ip,
      error: message,
    });

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

