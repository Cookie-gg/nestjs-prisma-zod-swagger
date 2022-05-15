import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const zUser = extendApi(
  z.object({
    uid: extendApi(z.string().min(4), {
      description: 'The id of user',
      type: 'string',
      nullable: false,
      minLength: 4,
      uniqueItems: true,
    }),
    name: extendApi(z.string().nonempty(), {
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
    password: extendApi(z.string().min(4), {
      description: 'Your password',
      nullable: false,
      type: 'string',
      minLength: 8,
    }),
    published: extendApi(z.boolean().optional(), {
      description: 'Is Your account published?',
      nullable: true,
      default: false,
      type: 'boolean',
    }),
    createdAt: extendApi(z.string().optional(), {
      description: 'The date which the user was created',
      readOnly: true,
      nullable: true,
      type: 'string',
    }),
    updatedAt: extendApi(z.string().optional(), {
      description: 'The date which the user was updated',
      readOnly: true,
      nullable: true,
      type: 'string',
    }),
  }),
  {
    title: 'User',
    description: 'A user schema',
  },
);

export class User extends createZodDto(zUser) {}

export class CreateUserInput extends createZodDto(
  zUser.omit({
    createdAt: true,
    updatedAt: true,
  }),
) {}

export class UpdateUserInput extends createZodDto(
  zUser.omit({
    createdAt: true,
    updatedAt: true,
  }),
) {}
