import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { mocks } from '~/mocks';
import { TestResponse } from '~/types/api';
import { UpdateResult } from 'typeorm';
import { UserModule } from '~/modules/user';
import { User } from '~/entities/user';
import { UserService } from '~/services/user';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

describe('UserController (e2e)', () => {
  let app: NestFastifyApplication;
  let req: request.SuperTest<request.Test>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    moduleFixture.get<UserService>(UserService).clear();
    req = request(app.getHttpServer());
  });

  afterAll(() => app.close());

  it('/user (POST)', async () => {
    const res: TestResponse<User> = await req.post('/user').send(mocks.user.user);
    expect(res.body).toStrictEqual(
      expect.objectContaining<User>({ ...mocks.user.user, profile: expect.objectContaining(mocks.user.user.profile) }),
    );
  });

  it('/user:id (Get)', async () => {
    const res: TestResponse<User> = await req.get(`/user/${mocks.user.user.id}`);
    expect(res.body).toStrictEqual(
      expect.objectContaining<User>({ ...mocks.user.user, profile: expect.objectContaining(mocks.user.user.profile) }),
    );
  });

  it('/user:id (Update)', async () => {
    const res: TestResponse<UpdateResult> = await req.put(`/user`).send({
      ...mocks.user.user,
      name: mocks.user.updatedName,
    });
    expect(res.body).toStrictEqual(
      expect.objectContaining<User>({
        ...mocks.user.user,
        name: mocks.user.updatedName,
        profile: expect.objectContaining(mocks.user.user.profile),
      }),
    );
  });

  it('/user:id (Delete)', async () => {
    await req.delete(`/user/${mocks.user.user.id}`);
    const res: TestResponse<ErrorEvent> = await req.get(`/user/${mocks.user.user.id}`).expect(404);
    expect(res.body.error).toBe('Not Found');
  });
});
