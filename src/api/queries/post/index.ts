import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi, generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';
import { zPost } from '~/entities/post';

export class GetPostsQuery extends createZodDto(
  zPost
    .omit({ uid: true, id: true })
    .extend({ id: extendApi(z.string().min(1), generateSchema(zPost.shape.id)) })
    .partial(),
) {}
