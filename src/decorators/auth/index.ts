import { applyDecorators, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiBody, ApiResponse, ApiHeader, ApiTags } from '@nestjs/swagger';
import { LoginUserInput } from '~/api/bodies/user';
import { Auth } from '~/entities/auth';

const controller = applyDecorators(ApiTags('auth'), Controller('auth'));

const login = applyDecorators(
  Post(),
  ApiOperation({ summary: 'Login user' }),
  ApiBody({ type: LoginUserInput }),
  ApiResponse({ type: Auth }),
  UseGuards(AuthGuard('local')),
);

const status = applyDecorators(
  Get('status'),
  ApiOperation({ summary: 'Check logging status' }),
  ApiHeader({ name: 'authorization', description: 'must be started with "bearer"' }),
  ApiResponse({ type: Auth }),
  UseGuards(AuthGuard('jwt')),
);

const refresh = applyDecorators(
  Get('refresh'),
  ApiHeader({ name: 'authorization', description: 'must be started with "bearer"' }),
  ApiOperation({ summary: 'Refresh token' }),
  ApiResponse({ type: Auth }),
  UseGuards(AuthGuard('jwt-refresh')),
);

export const AuthDecorator = {
  Controller: controller,
  Login: login,
  Status: status,
  Refresh: refresh,
};
