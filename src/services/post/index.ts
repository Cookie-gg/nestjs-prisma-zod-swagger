import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '~/services/prisma';
import { DeletePostParameter, GetPostParameter } from '~/api/parameters/post';
import { Post } from '~/entities/post';
import { postConverter } from '~/libs/converters/post';
import { GetPostsQuery } from '~/api/queries/post';
import { prismaIncludeQuery } from '~/libs/prisma';

const include = prismaIncludeQuery.post;

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(post: Post): Promise<Post> {
    const data = postConverter.create(post);
    return this.prisma.post.create({
      data,
      include: { topics: true },
    });
  }

  async find(query?: GetPostsQuery): Promise<Post[]> {
    const where = postConverter.getMany(query);
    return this.prisma.post.findMany({ where, include });
  }

  async findOne(param: GetPostParameter): Promise<Post> {
    const where = postConverter.get(param);
    const post = await this.prisma.post.findUnique({ where, include });
    if (!post) throw new NotFoundException('A post is not found');
    return post;
  }

  async update(post: Post): Promise<Post> {
    const where = postConverter.get({ id: post.id });
    const data = postConverter.update(post);
    return this.prisma.post.update({ where, data, include });
  }

  async delete(param: DeletePostParameter): Promise<void> {
    const where = postConverter.delete(param);
    await this.prisma.post.delete({ where });
  }

  async count() {
    return this.prisma.post.count();
  }

  async clear() {
    this.prisma.post.deleteMany();
  }
}
