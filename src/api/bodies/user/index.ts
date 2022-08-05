import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { zUser } from '~/entities/user';

export class LoginUserInput extends createZodDto(
  zUser.pick({ password: true }).extend({ uniqueInfo: z.union([zUser.shape.email, zUser.shape.id]) }),
) {}
