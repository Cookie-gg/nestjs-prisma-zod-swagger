import { Prisma } from '@prisma/client';
import { isEmail } from 'class-validator';
import { CreateUserInput, UpdateUserInput } from '~/domain/bodies/user';
import { DeleteUserParameter, GetUserParameter } from '~/domain/parameters/user';
import { GetUsersQuery } from '~/domain/queries/user';

const create = (user: CreateUserInput): Prisma.UserUncheckedCreateInput => {
  const { id, name, email, password, published, profile } = user;
  return {
    id,
    name,
    email,
    password,
    published,
    profile: { create: { biography: profile ? profile.biography : '' } },
  };
};

const update = (user: UpdateUserInput): Prisma.UserUncheckedUpdateInput => {
  const { id, name, email, password, published, profile } = user;
  return {
    id,
    name,
    email,
    password,
    published,
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

export const userConversions = {
  create,
  update,
  get,
  getMany,
  delete: _delete,
};
