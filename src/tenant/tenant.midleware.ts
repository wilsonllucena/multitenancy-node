import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TenantService } from './tenant.service';
import { getPrismaClientByTenant } from 'src/commons/database/prisma';
import { Prisma, Tenant } from '@prisma/client';

@Injectable()
export class TenantConnectMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TenantConnectMiddleware.name);
  constructor(private readonly service: TenantService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const name: string = req.headers['tenant'] as string;
    const tenant: Tenant = await this.service.findByName(name);

    if (!tenant) {
      throw new BadRequestException(
        'Database Connection Error',
        'Tenant not found! Please check the tenant name!',
      );
    }

    try {
      await getPrismaClientByTenant(tenant.database);
      next();
    } catch (e) {
      if (e instanceof Prisma.PrismaClientInitializationError) {
        this.logger.error('Database Connection Error');
      }
      throw new InternalServerErrorException('Oops! Something went wrong!');
    }
  }
}
