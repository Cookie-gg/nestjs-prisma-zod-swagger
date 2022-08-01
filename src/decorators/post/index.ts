import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { applyDecorators, Controller, Delete, Get, Post, Put, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { DeletePostParameter, GetPostParameter } from '~/api/parameters/post';
import { GetPostsQuery } from '~/api/queries/post';
import { Post as PostEntity } from '~/entities/post';

const controller = applyDecorators(ApiTags('post'), Controller('post'), UsePipes(ZodValidationPipe));

const create = applyDecorators(
  Post(),
  ApiOperation({ summary: 'Create a post' }),
  ApiBody({ type: PostEntity }),
  ApiResponse({ type: PostEntity }),
);

const get = applyDecorators(
  Get(),
  ApiOperation({ summary: 'Get posts' }),
  ApiQuery({ type: GetPostsQuery }),
  ApiResponse({ type: [PostEntity] }),
);

const getMany = applyDecorators(
  Get(':id'),
  ApiParam({
    name: 'id',
    type: GetPostParameter,
    description: 'You can use id as a unique data',
  }),
);

const del = applyDecorators(
  Delete(':id'),
  ApiParam({
    name: 'id',
    type: DeletePostParameter,
    description: 'You can use id as a unique data',
  }),
);

const update = applyDecorators(
  Put(),
  ApiBody({ type: PostEntity }),
  ApiResponse({ type: PostEntity }),
  ApiOperation({ summary: 'Update post by unique data' }),
);

export const PostDecorator = {
  Controller: controller,
  Create: create,
  Get: get,
  GetMany: getMany,
  Delete: del,
  Update: update,
};
