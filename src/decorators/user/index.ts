import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { applyDecorators, Controller, Delete, Get, Post, Put, UsePipes } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteUserParameter, GetUserParameter } from '~/api/parameters/user';
import { GetUsersQuery } from '~/api/queries/user';
import { User } from '~/entities/user';

const controller = applyDecorators(ApiTags('user'), Controller('user'), UsePipes(ZodValidationPipe));

const create = applyDecorators(
  Post(),
  ApiOperation({ summary: 'Create user' }),
  ApiBody({ type: User }),
  ApiResponse({ type: User }),
);

const get = applyDecorators(
  Get(),
  ApiOperation({ summary: 'Get users' }),
  ApiQuery({ type: GetUsersQuery }),
  ApiResponse({ type: [User] }),
);

const getMany = applyDecorators(
  Get(':id'),
  ApiParam({
    name: 'id',
    type: GetUserParameter,
    description: 'You can use uid or email as a unique data',
  }),
);

const del = applyDecorators(
  Delete(':id'),
  ApiParam({
    name: 'id',
    type: DeleteUserParameter,
    description: 'You can use uid or email as a unique data',
  }),
);

const update = applyDecorators(
  Put(),
  ApiBody({ type: User }),
  ApiResponse({ type: User }),
  ApiOperation({ summary: 'Update user by unique data' }),
);

export const UserDecorator = {
  Controller: controller,
  Create: create,
  Get: get,
  GetMany: getMany,
  Delete: del,
  Update: update,
};
