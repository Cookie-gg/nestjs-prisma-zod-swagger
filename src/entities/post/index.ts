import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { zTopic } from '~/entities/topic';
import { zUser } from '~/entities/user';

const zFrom = z.enum(['me', 'zenn', 'qiita']);

export const zPost = extendApi(
  z.object({
    uid: extendApi(z.number().optional(), {
      description: 'The unique id of user',
      type: 'number',
      uniqueItems: true,
      readOnly: true,
    }),
    id: extendApi(z.string().min(8).max(40), {
      description: 'The id of post (slug)',
      type: 'string',
      uniqueItems: true,
      minLength: 8,
      maxLength: 40,
    }),
    title: extendApi(z.string().min(1), {
      description: 'The id of post (slug)',
      type: 'string',
      uniqueItems: true,
      minLength: 1,
    }),
    from: extendApi(zFrom, {
      description: 'The id of post (slug)',
      type: 'string',
    }),
    published: extendApi(z.boolean().optional(), {
      description: 'Is a post published?',
      default: false,
      type: 'boolean',
    }),
    createdAt: extendApi(z.date().optional(), {
      description: 'The date which a post was created',
      readOnly: true,
      type: 'string',
    }),
    updatedAt: extendApi(z.date().optional(), {
      description: 'The date which a post was updated',
      readOnly: true,
      type: 'string',
    }),
    body: extendApi(z.string().min(1), {
      description: 'The body of post',
      type: 'string',
    }),
    authorId: zUser.shape.id,
    topics: zTopic.array(),
  }),
  {
    title: 'Post',
    description: 'A post schema',
  },
);

export class Post extends createZodDto(zPost) {}
