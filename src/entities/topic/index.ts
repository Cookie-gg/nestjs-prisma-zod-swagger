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
    }),
    name: extendApi(z.string().min(1).trim(), {
      description: 'The id of a post (slug)',
      type: 'string',
      uniqueItems: true,
      minLength: 1,
    }),
    icon: extendApi(z.string().min(1), {
      description: 'The icon of a post',
      type: 'string',
      minLength: 1,
    }),
  }),
  {
    title: 'Topic',
    description: 'A topic schema',
  },
);

export class Topic extends createZodDto(zTopic) {}
