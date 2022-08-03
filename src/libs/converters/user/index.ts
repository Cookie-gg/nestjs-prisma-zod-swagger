import { Prisma } from '@prisma/client';
import { isEmail } from 'class-validator';
import { CreateUserInput, UpdateUserInput } from '~/api/bodies/user';
import { DeleteUserParameter, GetUserParameter } from '~/api/parameters/user';
import { GetUsersQuery } from '~/api/queries/user';
import { User } from '~/entities/user';

const create = (user: CreateUserInput): Prisma.UserUncheckedCreateInput => {
  const { profile, ...rest } = user;
  return {
    ...rest,
    profile: { create: { biography: profile ? profile.biography : '' } },
  };
};

const update = (user: UpdateUserInput): Prisma.UserUncheckedUpdateInput => {
  const { profile, ...rest } = user;
  return {
    ...rest,
    profile: { update: profile || undefined },
  };
};

const getMany = (query?: GetUsersQuery): Prisma.UserWhereInput => {
  return query ? { id: { contains: query.id }, email: { contains: query.email }, name: { contains: query.name } } : {};
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
