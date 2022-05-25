import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserInput, UpdateUserInput, User, zUser } from '~/domain/models/user';
import { UserService } from '~/services';
import { ZodValidationPipe } from '@anatine/zod-nestjs';

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
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ type: [User] })
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'You can use uid or email as a unique data',
  })
  @ApiOperation({ summary: 'Get user by unique data' })
  async getUser(@Param() params: { id: string }) {
    return await this.userService.find(params.id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'You can use uid or email as a unique data',
  })
  @ApiOperation({ summary: 'Delete user by unique data' })
  async deleteUser(@Param() params: { id: string }) {
    return await this.userService.delete(params.id);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'You can use uid or email as a unique data',
  })
  @ApiBody({ type: UpdateUserInput })
  @ApiResponse({ type: User })
  @ApiOperation({ summary: 'Update user by unique data' })
  async updateUser(@Param() params: { id: string }, @Body() body: Partial<CreateUserInput>) {
    return await this.userService.update(params.id, zUser.partial().parse(body));
  }
}
