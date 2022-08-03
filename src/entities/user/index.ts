import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import { zProfile } from '~/entities/profile';

export const zUser = extendApi(
  z.object({
    uid: extendApi(z.number().optional(), {
      description: 'The unique id of user',
      type: 'number',
      nullable: true,
      uniqueItems: true,
      readOnly: true,
    }),
    id: extendApi(z.string().min(4).max(12), {
      description: 'The id of user',
      type: 'string',
      nullable: false,
      minLength: 4,
      maxLength: 12,
      uniqueItems: true,
    }),
    name: extendApi(z.string().min(1), {
      description: 'Your name',
      nullable: false,
      type: 'string',
    }),
    email: extendApi(z.string().email(), {
      description: 'Your email',
      nullable: false,
      type: 'string',
      uniqueItems: true,
    }),
    password: extendApi(z.string().min(8).max(40), {
      description: 'Your password',
      nullable: false,
      type: 'string',
      minLength: 8,
      maxLength: 40,
    }),
    published: extendApi(z.boolean().optional(), {
      description: 'Is Your account published?',
      nullable: true,
      default: false,
      type: 'boolean',
    }),
    created_at: extendApi(z.date().optional(), {
      description: 'The date which the user was created',
      readOnly: true,
      nullable: true,
      type: 'object',
    }),
    updated_at: extendApi(z.date().optional(), {
      description: 'The date which the user was updated',
      readOnly: true,
      nullable: true,
      type: 'object',
    }),
    profile: zProfile.nullable(),
  }),
  {
    title: 'User',
    description: 'A user schema',
  },
);

export class User extends createZodDto(zUser) {}
