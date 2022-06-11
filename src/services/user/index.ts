import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma';
import { User } from '~/domain/entities/user';
import { userConversions } from '~/libs/conversions/user';
import { prismaIncludeQuery } from '~/constants/prisma';
import { GetUsersQuery } from '~/domain/queries/user';
import { CreateUserInput, UpdateUserInput } from '~/domain/bodies/user';
import { DeleteUserParameter, GetUserParameter } from '~/domain/parameters/user';

const include = prismaIncludeQuery.user;

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserInput): Promise<User> {
    if (process.env.NODE_ENV !== 'test') user.password = await bcrypt.hash(user.password, 10);
    const data = userConversions.create(user);
    return this.prisma.user.create({ data, include });
  }

  async find(query?: GetUsersQuery): Promise<User[]> {
    const where = userConversions.getMany(query);
    return this.prisma.user.findMany({ where, include });
  }

  async findOne(param: GetUserParameter): Promise<User> {
    const where = userConversions.get(param);
    const user = await this.prisma.user.findUnique({ where, include });
    if (!user) throw new NotFoundException('A user is not found');
    return user;
  }

  async update(user: UpdateUserInput): Promise<User> {
    if (process.env.NODE_ENV !== 'test') user.password = await bcrypt.hash(user.password, 10);
    const data = userConversions.update(user);
    const where = userConversions.get({ id: user.id });
    return this.prisma.user.update({ where, data, include });
  }

  async delete(param: DeleteUserParameter): Promise<void> {
    const where = userConversions.delete(param);
    await this.prisma.user.delete({ where, include });
  }

  async count() {
    return this.prisma.user.count();
  }

  async clear() {
    this.prisma.user.deleteMany();
  }
}
