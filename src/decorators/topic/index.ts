import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { applyDecorators, Controller, Delete, Get, Post, Put, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { DeleteTopicParameter, GetTopicParameter } from '~/api/parameters/topic';
import { GetTopicsQuery } from '~/api/queries/topic';
import { Topic } from '~/entities/topic';

const controller = applyDecorators(ApiTags('topic'), Controller('topic'), UsePipes(ZodValidationPipe));

const create = applyDecorators(
  Post(),
  ApiOperation({ summary: 'Create a topic' }),
  ApiBody({ type: Topic }),
  ApiResponse({ type: Topic }),
);

const get = applyDecorators(
  Get(),
  ApiOperation({ summary: 'Get posts' }),
  ApiQuery({ type: GetTopicsQuery }),
  ApiResponse({ type: [Topic] }),
);

const getMany = applyDecorators(
  Get(':id'),
  ApiParam({
    name: 'id',
    type: GetTopicParameter,
    description: 'You can use id as a unique data',
  }),
);

const del = applyDecorators(
  Delete(':id'),
  ApiParam({
    name: 'id',
    type: DeleteTopicParameter,
    description: 'You can use id as a unique data',
  }),
);

const update = applyDecorators(
  Put(),
  ApiBody({ type: Topic }),
  ApiResponse({ type: Topic }),
  ApiOperation({ summary: 'Update topic by unique data' }),
);

export const TopicDecorator = {
  Controller: controller,
  Create: create,
  Get: get,
  GetMany: getMany,
  Delete: del,
  Update: update,
};
