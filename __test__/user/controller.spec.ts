import { Test, TestingModule } from '@nestjs/testing';
import { mocks } from '~/mocks';
import { UserController } from '~/controllers/user';
import { UserModule } from '~/modules/user';
import { UserService } from '~/services/user';
import { NotFoundException } from '@nestjs/common';
import { User } from '~/entities/user';

describe('UserController', () => {
  let controller: UserController;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [UserModule] }).compile();
    await module.get<UserService>(UserService).clear();
    controller = module.get<UserController>(UserController);
  });

  afterAll(() => module.close());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await controller.createUser(mocks.user.user);
    expect(user).toStrictEqual(
      expect.objectContaining<User>({ ...mocks.user.user, profile: expect.objectContaining(mocks.user.user.profile) }),
    );
  });

  it('should get a user by unique data', async () => {
    const user = await controller.getUser({ id: mocks.user.user.id });
    expect(user).toStrictEqual(
      expect.objectContaining<User>({ ...mocks.user.user, profile: expect.objectContaining(mocks.user.user.profile) }),
    );
  });

  it('should update a user by unique data', async () => {
    const user = await controller.updateUser({ ...mocks.user.user, name: mocks.user.updatedName });
    expect(user).toStrictEqual(
      expect.objectContaining<User>({
        ...mocks.user.user,
        name: mocks.user.updatedName,
        profile: expect.objectContaining(mocks.user.user.profile),
      }),
    );
  });

  it('should throw error for getting a deleted user', async () => {
    await controller.deleteUser({ id: mocks.user.user.id });
    expect(async () => await controller.getUser({ id: mocks.user.user.id })).rejects.toThrow(
      new NotFoundException('A user is not found'),
    );
  });
});
