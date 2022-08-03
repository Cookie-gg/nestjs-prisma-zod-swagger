import { generateMock } from '@anatine/zod-mock';
import { zProfile } from '~/entities/profile';
import { User, zUser } from '~/entities/user';

const userWthProfile = zUser.omit({ uid: true, created_at: true, updated_at: true }).extend({
  profile: zProfile.omit({ uid: true }),
});

const user: User = generateMock(userWthProfile);

const users: User[] = generateMock(userWthProfile.array().length(10));

const updatedName = generateMock(userWthProfile.shape.name);

export const mockUser = {
  user,
  users,
  updatedName,
};
