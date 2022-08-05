import { applyDecorators, Controller, Delete, Get, HttpStatus, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '~/entities/user';
import { CommonApiParam, CommonApiQuery } from '~/libs/swagger';

const UserApiParam = () => CommonApiParam({ description: 'You can use uid or email as a unique data' });

const UserApiQuery = applyDecorators(
  CommonApiQuery({ name: 'id' }),
  CommonApiQuery({ name: 'email' }),
  CommonApiQuery({ name: 'name' }),
);

const controller = applyDecorators(ApiTags('user'), Controller('user'));

const create = applyDecorators(
  Post(),
  ApiOperation({ summary: 'Create user' }),
  ApiBody({ type: User }),
  ApiResponse({ status: HttpStatus.OK, type: User }),
);

const getMany = applyDecorators(
  Get(),
  ApiOperation({ summary: 'Get users' }),
  UserApiQuery,
  ApiResponse({ status: HttpStatus.OK, type: [User] }),
);

const get = applyDecorators(
  Get(':id'),
  ApiOperation({ summary: 'Get a user' }),
  UserApiParam(),
  ApiResponse({ status: HttpStatus.OK, type: User }),
);

const del = applyDecorators(
  Delete(':id'),
  ApiOperation({ summary: 'Delete a user' }),
  UserApiParam(),
  ApiResponse({ status: HttpStatus.OK }),
);

const update = applyDecorators(
  Put(),
  ApiOperation({ summary: 'Update user by unique data' }),
  ApiBody({ type: User }),
  ApiResponse({ status: HttpStatus.OK, type: User }),
);

export const UserDecorator = {
  Controller: controller,
  Create: create,
  Get: get,
  GetMany: getMany,
  Delete: del,
  Update: update,
};
