import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantRepository } from './tenant.repository';

@Injectable()
export class TenantService {
  constructor(private repository: TenantRepository) {}
  async create(createTenantDto: any) {
    return await this.repository.save(createTenantDto);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const tenant = await await this.repository.findById(id);

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    return tenant;
  }

  async findByName(database: string) {
    return await this.repository.findName(database);
  }

  async update(id: number, updateTenantDto: any) {
    return await this.repository.update(id, updateTenantDto);
  }

  async remove(id: number) {
    return await this.repository.remove(id);
  }
}
