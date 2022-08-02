import { generateMock } from '@anatine/zod-mock';
import { zProfile } from '~/entities/profile';
import { User, zUser } from '~/entities/user';

const userWthProfile = zUser.omit({ created_at: true, updated_at: true }).extend({
  uid: zUser.shape.uid.transform(() => 1),
  profile: zProfile.extend({ uid: zProfile.shape.uid.transform(() => 1) }),
});

const user: User = generateMock(userWthProfile);

const users: User[] = generateMock(userWthProfile.array().length(10));

const updatedName = generateMock(userWthProfile.shape.name);

export const mockUser = {
  user,
  users,
  updatedName,
};
