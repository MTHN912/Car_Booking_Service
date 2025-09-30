import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AuditLogService } from '../audit-logs.service';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(private readonly auditLogService: AuditLogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(async (result) => {
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
          await this.auditLogService.logSuccess({
            actorId: request.user?.userId ?? null,
            action: request.method,
            model: request.route?.path ?? 'Unknown',
            entityId: result?.id ?? null,
            before: null,
            after: result,
            ip: request.ip,
          });
        }
      }),
    );
  }
}
