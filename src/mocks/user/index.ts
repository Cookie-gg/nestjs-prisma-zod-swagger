import { generateMock } from '@anatine/zod-mock';
import { zUser, zUserProfile } from '~/domain/entities/user';

const user = {
  ...generateMock(zUser.omit({ uid: true, createdAt: true, updatedAt: true, profile: true })),
  profile: generateMock(zUserProfile.omit({ uid: true })),
};

const users = [user];

const updatedName = 'hogehoge';

export const mockUser = {
  user,
  users,
  updatedName,
};
