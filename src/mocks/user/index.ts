import { generateMock } from '@anatine/zod-mock';
import { zProfile } from '~/entities/profile';
import { zUser } from '~/entities/user';

const user = {
  ...generateMock(zUser.omit({ uid: true, createdAt: true, updatedAt: true, profile: true })),
  profile: generateMock(zProfile.omit({ uid: true })),
};

const users = [user];

const updatedName = 'hogehoge';

export const mockUser = {
  user,
  users,
  updatedName,
};
