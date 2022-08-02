import { generateMock } from '@anatine/zod-mock';
import { zProfile } from '~/entities/profile';
import { Post, zPost } from '~/entities/post';
import { zTopic } from '~/entities/topic';

const postWthTopics = zPost.omit({ created_at: true, updated_at: true }).extend({
  uid: zPost.shape.uid.transform(() => 1),
  topics: zTopic
    .extend({ uid: zProfile.shape.uid.transform(() => 1) })
    .array()
    .length(3),
});

const post: Post = generateMock(postWthTopics);

const posts: Post[] = generateMock(postWthTopics.array().length(10));

export const mockPost = {
  post,
  posts,
};
