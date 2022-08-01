import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const zTopic = extendApi(
  z.object({
    uid: extendApi(z.number().optional(), {
      description: 'The unique id of a post',
      type: 'number',
      uniqueItems: true,
      readOnly: true,
      optional: true,
    }),
    name: extendApi(z.string().min(1), {
      description: 'The id of a post (slug)',
      type: 'string',
      uniqueItems: true,
    }),
    icon: extendApi(z.string().min(1), {
      description: 'The icon of a post',
      type: 'string',
      uniqueItems: true,
    }),
  }),
  {
    title: 'Post',
    description: 'A post schema',
  },
);

export class Topic extends createZodDto(zTopic) {}
