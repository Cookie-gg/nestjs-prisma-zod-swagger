import { Prisma } from '@prisma/client';
import { CreatePostInput } from '~/api/bodies/post';
import { DeletePostParameter, GetPostParameter } from '~/api/parameters/post';
import { GetPostsQuery } from '~/api/queries/post';
import { Post } from '~/entities/post';
import { Topic } from '~/entities/topic';

const connectOrCreate = (
  topics: Topic[],
  post_uid?: number,
): Prisma.Enumerable<Prisma.TopicsOnPostsCreateOrConnectWithoutPostInput> | undefined =>
  topics.map((topic) => {
    const { name, icon, uid: topic_uid } = topic;
    return {
      where: {
        topic_uid_post_uid: topic_uid && post_uid ? { topic_uid, post_uid } : undefined,
      },
      create: { topic: { create: { name, icon } } },
    };
  });

const create = (post: Post): Prisma.PostUncheckedCreateInput => {
  const { topics, ...rest } = post;
  const { uid: post_uid } = rest;

  return {
    ...rest,
    topics: {
      connectOrCreate: connectOrCreate(topics, post_uid),
    },
  };
};

const update = (post: Post): Prisma.PostUncheckedCreateInput => {
  const { topics, ...rest } = post;
  const { uid: post_uid } = rest;

  return {
    ...rest,
    topics: {
      connectOrCreate: connectOrCreate(topics, post_uid),
    },
  };
};

const getMany = (query?: GetPostsQuery): Prisma.PostWhereInput => {
  return query
    ? {
        id: { contains: query.id },
        title: { contains: query.title },
        from: { equals: query.from },
        published: { equals: query.published },
        created_at: { equals: query.created_at },
        updated_at: { equals: query.updated_at },
        author_uid: { equals: query.author_uid },
      }
    : {};
};

const get = (param: GetPostParameter): Prisma.PostWhereUniqueInput => {
  return { id: param.id };
};

const _delete = (param: DeletePostParameter): Prisma.PostWhereUniqueInput => {
  return { id: param.id };
};

export const postConverter = {
  create,
  update,
  get,
  getMany,
  delete: _delete,
};
