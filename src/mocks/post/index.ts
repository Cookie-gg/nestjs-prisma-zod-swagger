import { generateMock } from '@anatine/zod-mock';
import { Post, zPost } from '~/entities/post';
import { zTopic } from '~/entities/topic';

const postWthTopics = zPost.omit({ uid: true, created_at: true, updated_at: true }).extend({
  topics: zTopic.omit({ uid: true }).array().length(3),
});

const post: Post = generateMock(postWthTopics);

const posts: Post[] = generateMock(postWthTopics.array().length(10));

const updatedTitle = generateMock(postWthTopics.shape.title);

export const mockPost = {
  post,
  posts,
  updatedTitle,
};
