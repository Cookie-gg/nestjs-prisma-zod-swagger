import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '~/services/prisma';
import { User } from '~/entities/user';
import { userConverter } from '~/libs/converters/user';
import { prismaIncludeQuery } from '~/libs/prisma';
import { GetUsersQuery } from '~/api/queries/user';
import { DeleteUserParameter, GetUserParameter } from '~/api/parameters/user';

const include = prismaIncludeQuery.user;

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    if (process.env.NODE_ENV !== 'test') user.password = await bcrypt.hash(user.password, 10);
    user.id = user.id.toLowerCase();
    const data = userConverter.create(user);
    return this.prisma.user.create({ data, include });
  }

  async find(query?: GetUsersQuery): Promise<User[]> {
    const where = userConverter.getMany(query);
    return this.prisma.user.findMany({ where, include });
  }

  async findOne(param: GetUserParameter): Promise<User> {
    const where = userConverter.get(param);
    const user = await this.prisma.user.findUnique({ where, include });
    if (!user) throw new NotFoundException('A user is not found');
    return user;
  }

  async update(user: User): Promise<User> {
    if (process.env.NODE_ENV !== 'test') user.password = await bcrypt.hash(user.password, 10);
    const data = userConverter.update(user);
    const where = userConverter.get({ id: user.id });
    return this.prisma.user.update({ where, data, include });
  }

  async delete(param: DeleteUserParameter): Promise<void> {
    const where = userConverter.delete(param);
    await this.prisma.user.delete({ where, include });
  }

  async count() {
    return this.prisma.user.count();
  }

  async clear() {
    this.prisma.user.deleteMany();
  }
}
