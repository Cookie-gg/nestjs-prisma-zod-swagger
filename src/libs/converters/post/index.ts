import { Prisma } from '@prisma/client';
import { CreatePostInput, UpdatePostInput } from '~/api/bodies/post';
import { DeletePostParameter, GetPostParameter } from '~/api/parameters/post';
import { GetPostsQuery } from '~/api/queries/post';
import { Post } from '~/entities/post';
import { Topic } from '~/entities/topic';

const connectOrCreateTopics = (
  post_id: string,
  topics?: Topic[],
): Prisma.Enumerable<Prisma.TopicsOnPostsCreateOrConnectWithoutPostInput> | undefined => {
  if (!topics) return undefined;
  return topics.map((topic) => {
    const { name, icon } = topic;

    return {
      where: { topic_name_post_id: { topic_name: name, post_id } },
      create: { topic: { create: { name, icon } } },
    };
  });
};

const create = (post: CreatePostInput): Prisma.XOR<Prisma.PostCreateInput, Prisma.PostUncheckedCreateInput> => {
  const { topics, author_id, ...rest } = post;
  const { id: post_id } = rest;

  return {
    ...rest,
    topics: {
      connectOrCreate: connectOrCreateTopics(post_id, topics),
    },
    author: {
      connect: { id: author_id },
    },
  };
};

const update = (post: UpdatePostInput): Prisma.PostUncheckedCreateInput => {
  const { topics, ...rest } = post;
  const { id: post_id } = rest;
  return {
    ...rest,
    topics: {
      connectOrCreate: connectOrCreateTopics(post_id, topics),
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
        author_id: { contains: query.author_id },
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
