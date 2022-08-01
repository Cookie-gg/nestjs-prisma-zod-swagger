import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '~/services/user';
import * as bcrypt from 'bcrypt';
import { LoginUserInput } from '~/api/bodies/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly userService: UserService) {
    super({ usernameField: 'uniqueInfo' });
  }

  async validate(uniqueInfo: LoginUserInput['uniqueInfo'], password: LoginUserInput['password']) {
    const user = await this.userService.findOne({ id: uniqueInfo });
    if (!user) throw new NotFoundException('Your email is uncorrect.');
    if (process.env.NODE_ENV !== 'test' && !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Your password is uncorrect.');
    }
    return user;
  }
}
