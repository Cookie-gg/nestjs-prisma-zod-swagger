import { applyDecorators, Controller, Delete, Get, HttpStatus, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Post as PostEntity } from '~/entities/post';
import { CommonApiQuery } from '~/libs/swagger';

enum From {
  me = 'me',
  zenn = 'zenn',
  qiita = 'qiita',
}

const PostApiParam = () =>
  ApiParam({
    name: 'id',
    type: String,
    description: 'You can use id as a unique data',
  });

const PostApiQuery = applyDecorators(
  CommonApiQuery({ name: 'id' }),
  CommonApiQuery({ name: 'title' }),
  CommonApiQuery({ enum: From, name: 'from' }),
  CommonApiQuery({ type: Boolean, name: 'published' }),
  CommonApiQuery({ type: Date, name: 'created_at' }),
  CommonApiQuery({ type: Date, name: 'updated_at' }),
  CommonApiQuery({ name: 'body' }),
  CommonApiQuery({ name: 'author_id' }),
  CommonApiQuery({ type: [String], name: 'topics' }),
);

const controller = applyDecorators(ApiTags('post'), Controller('post'));

const create = applyDecorators(
  Post(),
  ApiOperation({ summary: 'Create a post' }),
  ApiBody({ type: PostEntity }),
  ApiResponse({ status: HttpStatus.OK, type: PostEntity }),
);

const getMany = applyDecorators(
  Get(),
  ApiOperation({ summary: 'Get posts' }),
  PostApiQuery,
  ApiResponse({ status: HttpStatus.OK, type: [PostEntity] }),
);

const get = applyDecorators(
  Get(':id'),
  ApiOperation({ summary: 'Get a post' }),
  PostApiParam(),
  ApiResponse({ status: HttpStatus.OK, type: PostEntity }),
);

const del = applyDecorators(
  Delete(':id'),
  ApiOperation({ summary: 'Delete a post' }),
  PostApiParam(),
  ApiResponse({ status: HttpStatus.OK }),
);

const update = applyDecorators(
  Put(),
  ApiOperation({ summary: 'Update post by unique data' }),
  ApiBody({ type: PostEntity }),
  ApiResponse({ status: HttpStatus.OK, type: PostEntity }),
);

export const PostDecorator = {
  Controller: controller,
  Create: create,
  Get: get,
  GetMany: getMany,
  Delete: del,
  Update: update,
};
