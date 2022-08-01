import { createZodDto } from '@anatine/zod-nestjs';
import { zTopic } from '~/entities/topic';

export class GetTopicsQuery extends createZodDto(zTopic.partial().pick({ name: true })) {}
