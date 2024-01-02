import 'dotenv/config';
import { Module } from '@nestjs/common';

import { TenantModule } from './tenant/tenant.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TenantModule, UserModule],
})
export class AppModule {}
