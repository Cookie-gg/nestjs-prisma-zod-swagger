import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const zProfile = extendApi(
  z.object({
    uid: extendApi(z.number().optional(), {
      description: 'The unique id of user',
      type: 'number',
      nullable: true,
      uniqueItems: true,
      readOnly: true,
    }),
    biography: extendApi(z.string(), {
      description: 'The biography of user',
      type: 'string',
      nullable: false,
    }),
  }),
  {
    title: 'Profile',
    description: 'A user profile schema',
  },
);
