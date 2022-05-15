import { generateMock } from '@anatine/zod-mock';
import { zUser } from '~/domain/models/user';

const user = generateMock(zUser.omit({ createdAt: true, updatedAt: true }));

const users = [user];

export const mockUser = {
  user,
  users,
};
