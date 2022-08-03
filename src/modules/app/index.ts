import { Module } from '@nestjs/common';
import { AuthModule } from '~/modules/auth';
import { UserModule } from '~/modules/user';
import { PostModule } from '~/modules/post';

@Module({
  imports: [UserModule, AuthModule, PostModule],
})
export class AppModule {}
