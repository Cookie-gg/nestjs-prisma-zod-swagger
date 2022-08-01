import { Req } from '@nestjs/common';
import { AuthDecorator } from '~/decorators/auth';
import { User } from '~/entities/user';
import { AuthService } from '~/services/auth';

@AuthDecorator.Controller
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AuthDecorator.Login
  login(@Req() req: { user: User }) {
    return this.authService.login(req.user);
  }

  @AuthDecorator.Status
  status(@Req() req: { user: User }) {
    return this.authService.login(req.user);
  }

  @AuthDecorator.Refresh
  refresh(@Req() req: { user: User }) {
    return this.authService.login(req.user);
  }
}
