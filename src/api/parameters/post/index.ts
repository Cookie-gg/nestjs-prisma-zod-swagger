import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export class GetPostParameter extends createZodDto(z.object({ id: z.string() })) {}

export class DeletePostParameter extends createZodDto(z.object({ id: z.string() })) {}
