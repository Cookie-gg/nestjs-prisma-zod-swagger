import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi, generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';
import { zPost } from '~/entities/post';

export class GetPostsQuery extends createZodDto(
  zPost
    .omit({ uid: true, createdAt: true, updatedAt: true, authorId: true })
    .extend({
      id: extendApi(z.string().min(1), generateSchema(zPost.shape.id)),
      topics: extendApi(z.string().array(), generateSchema(zPost.shape.topics)),
      created_at: zPost.shape.createdAt,
      updated_at: zPost.shape.updatedAt,
      author_id: zPost.shape.authorId,
    })
    .partial(),
) {}
