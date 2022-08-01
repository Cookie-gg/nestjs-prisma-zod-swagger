import { Prisma } from '@prisma/client';
import { DeletePostParameter, GetPostParameter } from '~/api/parameters/post';
import { GetTopicsQuery } from '~/api/queries/topic';

const getMany = (query?: GetTopicsQuery): Prisma.TopicWhereInput => {
  return query ? { name: { contains: query.name } } : {};
};

const get = (param: GetPostParameter): Prisma.TopicWhereUniqueInput => {
  return { name: param.id };
};

const _delete = (param: DeletePostParameter): Prisma.TopicWhereUniqueInput => {
  return { name: param.id };
};

export const topicConverter = {
  get,
  getMany,
  delete: _delete,
};
