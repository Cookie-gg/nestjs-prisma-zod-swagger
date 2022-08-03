import { z } from 'zod';
import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';
import { zUser } from '../user';

export const zAuth = extendApi(
  z.object({
    token: extendApi(z.string(), {
      description: 'The token of authentication availables for 2 hours',
      readOnly: true,
      nullable: false,
      type: 'string',
    }),
    refreshToken: extendApi(z.string(), {
      description: 'The refreshtoken of authentication availables for 2 weeks',
      readOnly: true,
      nullable: false,
      type: 'string',
    }),
    user: zUser,
  }),
  {
    title: 'Auth',
    description: 'A auth schema',
  },
);

export class Auth extends createZodDto(zAuth) {}

export class AuthPayload extends createZodDto(zUser.pick({ id: true, email: true })) {}
