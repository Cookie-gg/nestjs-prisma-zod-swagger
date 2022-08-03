import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { zUser } from '~/entities/user';

export class CreateUserInput extends createZodDto(
  zUser.omit({
    uid: true,
    created_at: true,
    updated_at: true,
  }),
) {}

export class UpdateUserInput extends createZodDto(
  zUser.omit({
    uid: true,
    created_at: true,
    updated_at: true,
  }),
) {}

export class LoginUserInput extends createZodDto(
  zUser.pick({ password: true }).extend({ uniqueInfo: z.union([zUser.shape.email, zUser.shape.id]) }),
) {}
