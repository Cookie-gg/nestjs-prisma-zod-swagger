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
  async createPost(@Body() body: Post) {
    return await this.postService.create(zPost.parse(body));
  }

  @PostDecorator.GetMany
  async getUsers(@Query() query?: GetPostsQuery) {
    console.log(query);
    return await this.postService.find(query);
  }

  @PostDecorator.Get
  async getUser(@Param() param: GetPostParameter) {
    return await this.postService.findOne(param);
  }

  @PostDecorator.Delete
  async deleteUser(@Param() params: DeletePostParameter) {
    return await this.postService.delete(params);
  }

  @PostDecorator.Update
  async updateUser(@Body() body: Post) {
    return await this.postService.update(body);
  }
}
