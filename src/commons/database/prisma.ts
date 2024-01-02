import { PrismaClient } from '@prisma/client';

export const prismaClient = {};
export let client: PrismaClient;
export async function getPrismaClientByTenant(tenantId: string): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL?.replace(
    'multitenancy',
    tenantId,
  );

  if (!prismaClient[tenantId]) {
    prismaClient[tenantId] = new PrismaClient({
      datasources: { db: { url: databaseUrl } },
    });
  }

  client = prismaClient[tenantId];

  return await client.$connect();
}
