import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const zProfile = extendApi(
  z.object({
    uid: extendApi(z.number().optional(), {
      description: 'The unique id of user',
      type: 'number',
      uniqueItems: true,
      readOnly: true,
    }),
    twitter: extendApi(z.string().optional().nullable(), {
      description: 'Twitter profile link',
      type: 'string',
      nullable: true,
    }),
    zenn: extendApi(z.string().optional().nullable(), {
      description: 'Zenn profile link',
      type: 'string',
      nullable: true,
    }),
    qiita: extendApi(z.string().optional().nullable(), {
      description: 'Qiita profile link',
      type: 'string',
      nullable: true,
    }),
    link: extendApi(z.string().optional().nullable(), {
      description: 'Your own link',
      type: 'string',
      nullable: true,
    }),
    avatar: extendApi(z.string().optional().nullable(), {
      description: 'Your avatar icon',
      type: 'string',
      nullable: true,
    }),
  }),
  {
    title: 'Profile',
    description: 'A user profile schema',
  },
);
