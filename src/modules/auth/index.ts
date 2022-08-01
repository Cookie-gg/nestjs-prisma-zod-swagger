import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '~/modules/user';
import { AuthController } from '~/controllers/auth';
import { AuthService } from '~/services/auth';
import { JwtStrategy } from '~/strategies/jwt';
import { JwtRefreshStrategy } from '~/strategies/jwt-refresh';
import { LocalStrategy } from '~/strategies/local';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule.register({}), UserModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
