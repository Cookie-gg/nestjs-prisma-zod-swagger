import { Module } from '@nestjs/common';
import { UserController } from '~/controllers/user';
import { UserService } from '~/services/user';
import { PrismaService } from '~/services';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
