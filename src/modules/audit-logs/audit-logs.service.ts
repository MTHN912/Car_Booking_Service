import { Injectable } from '@nestjs/common';
import { AuditLogRepository } from './audit-logs.repository';

@Injectable()
export class AuditLogService {
  constructor(private readonly repo: AuditLogRepository) {}

  async logSuccess({
    actorId,
    action,
    model,
    entityId,
    before,
    after,
    ip,
  }: {
    actorId?: string;
    action: string;
    model: string;
    entityId?: string;
    before?: any;
    after?: any;
    ip?: string;
  }) {
    return this.repo.createLog({
      actorId,
      action,
      model,
      entityId,
      before,
      after,
      ip,
    });
  }

  async logError({
    actorId,
    action,
    model,
    entityId,
    before,
    ip,
    error,
  }: {
    actorId?: string;
    action: string;
    model: string;
    entityId?: string;
    before?: any;
    ip?: string;
    error: any;
  }) {
    return this.repo.createLog({
      actorId,
      action,
      model,
      entityId,
      before,
      after: { error },
      ip,
    });
  }

  async getLogs() {
    return this.repo.findAll();
  }
}
