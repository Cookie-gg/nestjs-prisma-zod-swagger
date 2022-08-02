import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { zTopic } from '~/entities/topic';
import { zUser } from '../user';

const zFrom = z.enum(['me', 'zenn', 'qiita']);

export const zPost = extendApi(
  z.object({
    uid: extendApi(z.number().optional(), {
      description: 'The unique id of user',
      type: 'number',
      uniqueItems: true,
      readOnly: true,
      optional: true,
    }),
    id: extendApi(z.string().min(8), {
      description: 'The id of post (slug)',
      type: 'string',
      uniqueItems: true,
    }),
    title: extendApi(z.string().min(1), {
      description: 'The id of post (slug)',
      type: 'string',
      uniqueItems: true,
    }),
    from: extendApi(zFrom, {
      description: 'The id of post (slug)',
      type: 'string',
      optional: true,
    }),
    published: extendApi(z.boolean().optional().default(false), {
      description: 'Is a post published?',
      default: false,
      optional: true,
      type: 'boolean',
    }),
    created_at: extendApi(z.date().optional(), {
      description: 'The date which a post was created',
      readOnly: true,
      optional: true,
      type: 'object',
    }),
    updated_at: extendApi(z.date().optional(), {
      description: 'The date which a post was updated',
      readOnly: true,
      optional: true,
      type: 'object',
    }),
    author_id: zUser.shape.id,
    topics: zTopic.array(),
  }),
  {
    title: 'Post',
    description: 'A post schema',
  },
);

export class Post extends createZodDto(zPost) {}
