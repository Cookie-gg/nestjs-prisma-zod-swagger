import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User, zUser } from '~/domain/entities/user';
import { UserService } from '~/services';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { CreateUserInput, UpdateUserInput } from '~/domain/bodies/user';
import { GetUsersQuery } from '~/domain/queries/user';
import { DeleteUserParameter, GetUserParameter } from '~/domain/parameters/user';

@ApiTags('user')
@Controller('user')
@UsePipes(ZodValidationPipe)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserInput })
  @ApiResponse({ type: User })
  async createUser(@Body() body: CreateUserInput) {
    return await this.userService.create(zUser.parse(body));
  }

  @Get()
  @ApiOperation({ summary: 'Get users' })
  @ApiQuery({ type: GetUsersQuery })
  @ApiResponse({ type: [User] })
  async getUsers(@Query() query?: GetUsersQuery) {
    return await this.userService.find(query);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: GetUserParameter,
    description: 'You can use uid or email as a unique data',
  })
  @ApiResponse({ type: User })
  @ApiOperation({ summary: 'Get user by unique data' })
  async getUser(@Param() param: GetUserParameter) {
    return await this.userService.findOne(param);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: DeleteUserParameter,
    description: 'You can use uid or email as a unique data',
  })
  @ApiOperation({ summary: 'Delete user by unique data' })
  async deleteUser(@Param() params: DeleteUserParameter) {
    return await this.userService.delete(params);
  }

  @Put()
  @ApiBody({ type: UpdateUserInput })
  @ApiResponse({ type: User })
  @ApiOperation({ summary: 'Update user by unique data' })
  async updateUser(@Body() body: UpdateUserInput) {
    return await this.userService.update(body);
  }
}
