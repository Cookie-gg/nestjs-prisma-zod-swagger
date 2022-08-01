import { createZodDto } from '@anatine/zod-nestjs';
import { zPost } from '~/entities/post';

export class GetPostsQuery extends createZodDto(zPost.partial().omit({ uid: true })) {}
