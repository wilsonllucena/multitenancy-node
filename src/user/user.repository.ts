import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { log } from 'console';
import { client } from 'src/commons/database/prisma';

export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  async find(): Promise<User[]> {
    try {
      return await client.user.findMany({
        orderBy: {
          id: 'asc',
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientInitializationError) {
        this.logger.error('Database Connection Error');
      }
      throw new InternalServerErrorException('Oops! Something went wrong!');
    }
  }

  async findOne(id: number) {
    try {
      return await client.user.findUnique({
        where: { id },
      });
    } catch (e) {
      throw new InternalServerErrorException('Oops! Something went wrong!');
    }
  }

  async save(data: Prisma.UserCreateInput) {
    try {
      return await client.user.create({ data });
    } catch (e) {
      throw new InternalServerErrorException('Oops! Something went wrong!');
    }
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    try {
      return await client.user.update({
        where: { id },
        data,
      });
    } catch (e) {
      throw new InternalServerErrorException('Oops! Something went wrong!');
    }
  }

  async remove(id: number) {
    try {
      return await client.user.delete({
        where: { id },
      });
    } catch (e) {
      throw new InternalServerErrorException('Oops! Something went wrong!');
    }
  }
}
