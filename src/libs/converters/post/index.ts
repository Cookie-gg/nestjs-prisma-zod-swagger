import { Prisma } from '@prisma/client';
import { DeletePostParameter, GetPostParameter } from '~/api/parameters/post';
import { GetPostsQuery } from '~/api/queries/post';
import { Post } from '~/entities/post';
import { Topic } from '~/entities/topic';

const connectOrCreateTopics = (
  topics?: Topic[],
): Prisma.Enumerable<Prisma.TopicCreateOrConnectWithoutPostsInput> | undefined => {
  if (!topics) return undefined;
  return topics.map((topic) => {
    const { name, icon } = topic;

    return {
      where: { name },
      create: { name, icon },
    };
  });
};

const create = (post: Post): Prisma.XOR<Prisma.PostCreateInput, Prisma.PostUncheckedCreateInput> => {
  const { uid: _, topics, authorId, ...rest } = post;

  return {
    ...rest,
    topics: {
      connectOrCreate: connectOrCreateTopics(topics),
    },
    author: {
      connect: { id: authorId },
    },
  };
};

const update = (post: Post): Prisma.XOR<Prisma.PostUpdateInput, Prisma.PostUncheckedUpdateInput> => {
  const { uid: _, topics, authorId, ...rest } = post;

  return {
    ...rest,
    topics: {
      connectOrCreate: connectOrCreateTopics(topics),
    },
    author: {
      update: { id: authorId },
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
        createdAt: { equals: query.created_at },
        updatedAt: { equals: query.updated_at },
        authorId: { contains: query.author_id },
        topics: { some: { AND: query.topics?.map((topic) => ({ name: { contains: topic } })) } },
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
