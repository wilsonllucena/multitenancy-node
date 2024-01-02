import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async findAll(): Promise<any[]> {
    return await this.repository.find();
  }

  async create(data: any): Promise<any> {
    return await this.repository.save(data);
  }

  async findOne(id: number): Promise<any> {
    const user = await this.repository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, data: any): Promise<any> {
    const user = await this.repository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.repository.update(id, data);
  }

  async remove(id: number): Promise<void> {
    const user = await this.repository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.repository.remove(id);
  }
}
