import { createZodDto } from '@anatine/zod-nestjs';
import { zUser } from '~/domain/entities/user';

export class GetUsersQuery extends createZodDto(zUser.partial().pick({ id: true, email: true, name: true })) {}
