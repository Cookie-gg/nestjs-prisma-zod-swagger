import { createZodDto } from '@anatine/zod-nestjs';
import { zUser } from '~/entities/user';

export class GetUsersQuery extends createZodDto(
  zUser.omit({ uid: true, password: true, profile: true, createdAt: true, updatedAt: true }).extend({
    created_at: zUser.shape.createdAt,
    updated_at: zUser.shape.updatedAt,
  }),
) {}
