import { createZodDto } from '@anatine/zod-nestjs';
import { zPost } from '~/entities/post';

export class CreatePostInput extends createZodDto(
  zPost.omit({
    uid: true,
    created_at: true,
    updated_at: true,
  }),
) {}

export class UpdatePostInput extends createZodDto(
  zPost.omit({
    uid: true,
    created_at: true,
    updated_at: true,
  }),
) {}
