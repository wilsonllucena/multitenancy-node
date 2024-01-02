import { Injectable } from '@nestjs/common';
import { Prisma, Tenant } from '@prisma/client';
import { prisma } from 'prisma/prisma.service';

@Injectable()
export class TenantRepository {
  async find(): Promise<Tenant[]> {
    try {
      return await prisma.tenant.findMany();
    } catch (e) {
      console.log(e);
    }
  }

  async findOne(name: string): Promise<Tenant> {
    return await prisma.tenant.findFirst({
      where: { code: name },
    });
  }

  async findName(name: string): Promise<Tenant> {
    return await prisma.tenant.findUnique({
      where: { code: name },
    });
  }

  async findById(id: number): Promise<Tenant> {
    return await prisma.tenant.findUnique({
      where: { id },
    });
  }

  async save(data: Prisma.TenantCreateInput): Promise<Tenant> {
    return await prisma.tenant.create({ data });
  }

  async update(id: number, data: Prisma.TenantUpdateInput): Promise<Tenant> {
    return await prisma.tenant.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Tenant> {
    return await prisma.tenant.delete({
      where: { id },
    });
  }
}
