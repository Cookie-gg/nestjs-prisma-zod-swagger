import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export class GetTopicParameter extends createZodDto(z.object({ id: z.string() })) {}

export class DeleteTopicParameter extends createZodDto(z.object({ id: z.string() })) {}
