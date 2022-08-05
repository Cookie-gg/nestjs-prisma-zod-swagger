import { Prisma } from '@prisma/client';
import { DeleteUserParameter, GetUserParameter } from '~/api/parameters/user';
import { GetUsersQuery } from '~/api/queries/user';
import { User } from '~/entities/user';
import { isEmail } from '~/libs/zod';

const create = (user: User): Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput> => {
  const { profile, ...rest } = user;
  return {
    ...rest,
    profile: { create: profile ? profile : {} },
  };
};

const update = (user: User): Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput> => {
  const { profile, ...rest } = user;
  return {
    ...rest,
    profile: { update: profile ? profile : {} },
  };
};

const getMany = (query?: GetUsersQuery): Prisma.UserWhereInput => {
  return query
    ? {
        id: { contains: query.id },
        name: { contains: query.name },
        email: { contains: query.email },
        published: { equals: query.published },
        createdAt: { equals: query.created_at },
        updatedAt: { equals: query.updated_at },
      }
    : {};
};

const get = (param: GetUserParameter): Prisma.UserWhereUniqueInput => {
  return isEmail(param.id) ? { email: param.id } : { id: param.id };
};

const _delete = (param: DeleteUserParameter): Prisma.UserWhereUniqueInput => {
  return isEmail(param.id) ? { email: param.id } : { id: param.id };
};

export const userConverter = {
  create,
  update,
  get,
  getMany,
  delete: _delete,
};
