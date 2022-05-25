import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '~/services';
import * as bcrypt from 'bcrypt';
import { zLoginInput } from '~/domain/models/auth';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly userService: UserService) {
    super({ usernameField: 'uniqueInfo' });
  }

  async validate(uniqueInfo: string, password: string) {
    const results = zLoginInput.parse({ uniqueInfo, password });
    const user = await this.userService.find(results.uniqueInfo);
    if (!user) throw new NotFoundException('Your email is uncorrect.');
    if (process.env.NODE_ENV !== 'test' && !(await bcrypt.compare(results.password, user.password))) {
      throw new UnauthorizedException('Your password is uncorrect.');
    }
    return user;
  }
}
