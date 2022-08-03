import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { mocks } from '~/mocks';
import { TestResponse } from '~/types/api';
import { UserModule } from '~/modules/user';
import { UserService } from '~/services/user';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { PostModule } from '~/modules/post';
import { PostService } from '~/services/post';
import { Post } from '~/entities/post';

const mockPost = { ...mocks.post.post, author_id: mocks.user.user.id };

describe('UserController (e2e)', () => {
  let app: NestFastifyApplication;
  let req: request.SuperTest<request.Test>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule, PostModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    moduleFixture.get<PostService>(PostService).clear();
    moduleFixture.get<UserService>(UserService).create(mocks.user.user);
    req = request(app.getHttpServer());
  });

  afterAll(() => app.close());

  it('/post (POST)', async () => {
    const res: TestResponse<Post> = await req.post('/post').send(mockPost);
    expect(res.body).toStrictEqual(
      expect.objectContaining<Post>({
        ...mockPost,
        topics: mockPost.topics.map((topic) => expect.objectContaining(topic)),
      }),
    );
  });

  it('/post:id (Get)', async () => {
    const res: TestResponse<Post> = await req.get(`/post/${mockPost.id}`);
    expect(res.body).toStrictEqual(
      expect.objectContaining<Post>({
        ...mockPost,
        topics: mockPost.topics.map((topic) => expect.objectContaining(topic)),
      }),
    );
  });

  it('/post:id (Update)', async () => {
    const res: TestResponse<Post> = await req.put(`/post`).send({
      ...mockPost,
      title: mocks.post.updatedTitle,
    });
    expect(res.body).toStrictEqual(
      expect.objectContaining<Post>({
        ...mockPost,
        title: mocks.post.updatedTitle,
        topics: mockPost.topics.map((topic) => expect.objectContaining(topic)),
      }),
    );
  });

  it('/post:id (Delete)', async () => {
    await req.delete(`/post/${mockPost.id}`);
    const res: TestResponse<ErrorEvent> = await req.get(`/post/${mockPost.id}`).expect(404);
    expect(res.body.error).toBe('Not Found');
  });
});
