import { Module } from '@nestjs/common';
import { PostController } from '~/controllers/post';
import { PostService } from '~/services/post';
import { PrismaService } from '~/services/prisma';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
  exports: [PostService],
})
export class PostModule {}
