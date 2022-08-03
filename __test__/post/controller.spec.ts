import { Test, TestingModule } from '@nestjs/testing';
import { mocks } from '~/mocks';
import { NotFoundException } from '@nestjs/common';
import { PostController } from '~/controllers/post';
import { PostModule } from '~/modules/post';
import { PostService } from '~/services/post';
import { UserModule } from '~/modules/user';
import { UserService } from '~/services/user';
import { Post } from '~/entities/post';

const mockPost = { ...mocks.post.post, author_id: mocks.user.user.id };

describe('PostController', () => {
  let controller: PostController;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [UserModule, PostModule] }).compile();
    await module.get<PostService>(PostService).clear(); // clear posts
    controller = module.get<PostController>(PostController);
    await module.get<UserService>(UserService).create(mocks.user.user); // create a user for creating a post
  });

  afterAll(() => module.close());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a post', async () => {
    const post = await controller.createPost(mockPost);
    expect(post).toEqual(
      expect.objectContaining<Post>({
        ...mockPost,
        topics: mockPost.topics.map((topic) => expect.objectContaining(topic)),
      }),
    );
  });

  it('should get a post by unique data', async () => {
    const post = await controller.getPost({ id: mockPost.id });
    expect(post).toStrictEqual(
      expect.objectContaining<Post>({
        ...mockPost,
        topics: mockPost.topics.map((topic) => expect.objectContaining(topic)),
      }),
    );
  });

  it('should update a post by unique data', async () => {
    const post = await controller.updatePost({ ...mockPost, title: mocks.post.updatedTitle });
    expect(post).toStrictEqual(
      expect.objectContaining<Post>({
        ...mockPost,
        title: mocks.post.updatedTitle,
        topics: mockPost.topics.map((topic) => expect.objectContaining(topic)),
      }),
    );
  });

  it('should throw error for getting a deleted post', async () => {
    await controller.deletePost({ id: mockPost.id });
    expect(async () => await controller.getPost({ id: mockPost.id })).rejects.toThrow(
      new NotFoundException('A post is not found'),
    );
  });
});
