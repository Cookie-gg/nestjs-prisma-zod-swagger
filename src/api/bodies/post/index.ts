import { createZodDto } from '@anatine/zod-nestjs';
import { zPost } from '~/entities/post';
import { zUser } from '~/entities/user';

const zCreatePostInput = zPost.omit({
  uid: true,
  created_at: true,
  updated_at: true,
});

export class CreatePostInput extends createZodDto(zCreatePostInput) {}

export class UpdatePostInput extends createZodDto(
  zPost.omit({
    uid: true,
    created_at: true,
    updated_at: true,
  }),
) {}
