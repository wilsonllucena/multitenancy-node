import {
  BadRequestException,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';

import { TenantRepository } from './tenant.repository';
import { TenantConnectMiddleware } from './tenant.midleware';

@Module({
  controllers: [TenantController],
  providers: [TenantService, TenantRepository],
})
export class TenantModule {
  constructor(private readonly service: TenantService) {}

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(TenantConnectMiddleware)
      .exclude(
        { path: 'tenants', method: RequestMethod.ALL },
        {
          path: 'tenants/:id',
          method: RequestMethod.ALL,
        },
      )
      .forRoutes('*');
  }
}
