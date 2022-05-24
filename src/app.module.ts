import { Module } from '@nestjs/common';
import { UserModule, AuthModule } from '~/modules';

@Module({
  imports: [UserModule, AuthModule],
})
export class AppModule {}
