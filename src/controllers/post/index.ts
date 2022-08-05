import { Body, Param, Query } from '@nestjs/common';
import { PostDecorator } from '~/decorators/post';
import { Post, zPost } from '~/entities/post';
import { PostService } from '~/services/post';
import { GetPostsQuery } from '~/api/queries/post';
import { DeletePostParameter, GetPostParameter } from '~/api/parameters/post';

@PostDecorator.Controller
export class PostController {
  constructor(private readonly postService: PostService) {}

  @PostDecorator.Create
  async createPost(@Body() body: Post): Promise<Post> {
    return await this.postService.create(zPost.parse(body));
  }

  @PostDecorator.GetMany
  async getPosts(@Query() query?: GetPostsQuery): Promise<Post[]> {
    return await this.postService.find(query);
  }

  @PostDecorator.Get
  async getPost(@Param() param: GetPostParameter): Promise<Post> {
    return await this.postService.findOne(param);
  }

  @PostDecorator.Delete
  async deletePost(@Param() params: DeletePostParameter): Promise<void> {
    return await this.postService.delete(params);
  }

  @PostDecorator.Update
  async updatePost(@Body() body: Post): Promise<Post> {
    return await this.postService.update(body);
  }
}
