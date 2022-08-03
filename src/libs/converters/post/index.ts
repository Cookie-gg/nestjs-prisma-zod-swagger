import { Prisma } from '@prisma/client';
import { CreatePostInput, UpdatePostInput } from '~/api/bodies/post';
import { DeletePostParameter, GetPostParameter } from '~/api/parameters/post';
import { GetPostsQuery } from '~/api/queries/post';
import { Post } from '~/entities/post';
import { Topic } from '~/entities/topic';
import { mocks } from '~/mocks';

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
  const { uid: _, topics, author_id, ...rest } = post;

  return {
    ...rest,
    topics: {
      connectOrCreate: connectOrCreateTopics(topics),
    },
    author: {
      connect: { id: author_id },
    },
  };
};

const update = (post: Post): Prisma.XOR<Prisma.PostUpdateInput, Prisma.PostUncheckedUpdateInput> => {
  const { uid: _, topics, author_id, ...rest } = post;

  return {
    ...rest,
    topics: {
      connectOrCreate: connectOrCreateTopics(topics),
    },
    author: {
      connect: { id: author_id },
    },
  };
};

const getMany = (query?: GetPostsQuery): Prisma.PostWhereInput => {
  console.log(mocks.post.post);
  return query
    ? {
        id: { contains: query.id },
        title: { contains: query.title },
        from: { equals: query.from },
        published: { equals: query.published },
        created_at: { equals: query.created_at },
        updated_at: { equals: query.updated_at },
        author_id: { contains: query.author_id },
        topics: { some: { AND: query.topics?.map((topic) => ({ name: { contains: topic.name } })) } },
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
