import { applyDecorators, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiBody, ApiHeader, ApiTags, ApiResponse } from '@nestjs/swagger';
import { LoginUserInput } from '~/api/bodies/user';
import { Auth } from '~/entities/auth';

const controller = applyDecorators(ApiTags('auth'), Controller('auth'));

const login = applyDecorators(
  Post(),
  ApiOperation({ summary: 'Login user' }),
  ApiBody({ type: LoginUserInput }),
  UseGuards(AuthGuard('local')),
  ApiResponse({ status: HttpStatus.OK, type: Auth }),
);

const status = applyDecorators(
  Get('status'),
  ApiOperation({ summary: 'Check logging status' }),
  ApiHeader({ name: 'authorization', description: 'must be started with "bearer"' }),
  UseGuards(AuthGuard('jwt')),
  ApiResponse({ status: HttpStatus.OK, type: Auth }),
);

const refresh = applyDecorators(
  Get('refresh'),
  ApiHeader({ name: 'authorization', description: 'must be started with "bearer"' }),
  ApiOperation({ summary: 'Refresh token' }),
  UseGuards(AuthGuard('jwt-refresh')),
  ApiResponse({ status: HttpStatus.OK, type: Auth }),
);

export const AuthDecorator = {
  Controller: controller,
  Login: login,
  Status: status,
  Refresh: refresh,
};
