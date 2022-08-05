import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { zProfile } from '~/entities/profile';

export const zUser = extendApi(
  z.object({
    uid: extendApi(z.number().optional(), {
      description: 'The unique id of user',
      type: 'number',
      uniqueItems: true,
      readOnly: true,
    }),
    id: extendApi(z.string().min(4).max(12), {
      description: 'The id of user',
      type: 'string',
      minLength: 4,
      maxLength: 12,
      uniqueItems: true,
    }),
    name: extendApi(z.string().min(1), {
      description: 'Your name',
      type: 'string',
      minLength: 1,
    }),
    email: extendApi(z.string().email(), {
      description: 'Your email',
      type: 'string',
      uniqueItems: true,
    }),
    password: extendApi(z.string().min(8).max(40), {
      description: 'Your password',
      type: 'string',
      minLength: 8,
      maxLength: 40,
    }),
    published: extendApi(z.boolean().optional(), {
      description: 'Is Your account published?',
      default: false,
      type: 'boolean',
    }),
    createdAt: extendApi(z.date().optional(), {
      description: 'The date which the user was created',
      readOnly: true,
      type: 'string',
    }),
    updatedAt: extendApi(z.date().optional(), {
      description: 'The date which the user was updated',
      readOnly: true,
      type: 'string',
    }),
    profile: zProfile.nullable(),
  }),
  {
    title: 'User',
    description: 'A user schema',
  },
);

export class User extends createZodDto(zUser) {}
