import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserInput } from '~/domain/bodies/user';
import { Auth } from '~/domain/entities/auth';
import { User } from '~/domain/entities/user';
import { AuthService } from '~/services';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginUserInput })
  @ApiResponse({ type: Auth })
  @UseGuards(AuthGuard('local'))
  login(@Req() req: { user: User }) {
    return this.authService.login(req.user);
  }

  @Get('status')
  @ApiOperation({ summary: 'Check logging status' })
  @ApiHeader({ name: 'authorization', description: 'must be started with "bearer"' })
  @ApiResponse({ type: Auth })
  @UseGuards(AuthGuard('jwt'))
  status(@Req() req: { user: User }) {
    return this.authService.login(req.user);
  }

  @Get('refresh')
  @ApiHeader({ name: 'authorization', description: 'must be started with "bearer"' })
  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({ type: Auth })
  @UseGuards(AuthGuard('jwt-refresh'))
  refresh(@Req() req: { user: User }) {
    return this.authService.login(req.user);
  }
}
