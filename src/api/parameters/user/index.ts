import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export class GetUserParameter extends createZodDto(z.object({ id: z.string() })) {}

export class DeleteUserParameter extends createZodDto(z.object({ id: z.string() })) {}
