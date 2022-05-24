import { Injectable, NotFoundException } from '@nestjs/common';
import { isEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    data.password = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({ data });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async find(uniqueData: string) {
    const user = await this.prisma.user.findUnique({ where: this.validateUniqueData(uniqueData) });
    if (!user) throw new NotFoundException('A user is not found');
    return user;
  }

  async update(uniqueData: string, updates: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ where: this.validateUniqueData(uniqueData), data: updates });
  }

  async delete(uniqueData: string) {
    return this.prisma.user.delete({ where: this.validateUniqueData(uniqueData) });
  }

  validateUniqueData(uniqueData: string): Prisma.UserWhereUniqueInput {
    return isEmail(uniqueData) ? { email: uniqueData } : { uid: uniqueData };
  }

  async count() {
    return this.prisma.user.count();
  }

  async clear() {
    const tableNames = (
      (await this.prisma.$queryRawUnsafe(`SELECT user FROM pg_catalog.pg_tables WHERE hastriggers = true;`)) as {
        tablename: string;
      }[]
    ).map(({ tablename }) => tablename);
    await this.prisma.$transaction(
      tableNames.map((tableName) =>
        this.prisma.$queryRawUnsafe(`TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE;`),
      ),
    );
  }
}
