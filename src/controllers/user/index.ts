import { Body, Param, Query } from '@nestjs/common';
import { User, zUser } from '~/entities/user';
import { UserService } from '~/services/user';
import { GetUsersQuery } from '~/api/queries/user';
import { DeleteUserParameter, GetUserParameter } from '~/api/parameters/user';
import { UserDecorator } from '~/decorators/user';

@UserDecorator.Controller
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UserDecorator.Create
  async createUser(@Body() body: User) {
    return await this.userService.create(zUser.parse(body));
  }

  @UserDecorator.Get
  async getUsers(@Query() query?: GetUsersQuery) {
    return await this.userService.find(query);
  }

  @UserDecorator.GetMany
  async getUser(@Param() param: GetUserParameter) {
    return await this.userService.findOne(param);
  }

  @UserDecorator.Delete
  async deleteUser(@Param() params: DeleteUserParameter) {
    return await this.userService.delete(params);
  }

  @UserDecorator.Update
  async updateUser(@Body() body: User) {
    return await this.userService.update(body);
  }
}
