import { Body, Controller, Get, Param, Post, Put, Query, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('add')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.addUser(user);
  }

  @Get('list')
  findAll() {
    return this.userService.findAll();
  }

  @Get('list/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Delete('list/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }

  @Put('list/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Get('getUser')
  getUser(): string {
    return 'This is the user controller';
  }

  @Get('user/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
  @Get('list')
  getList(@Query('page') page: number, @Query('size') size: number) {
    //这里模拟分页查询，实际项目中会调用数据库
    return this.userService.getList(page, size);
  }

  //user/user/123 === 路径参数 请求体参数
  @Put('user/:id')
  updateUser1(@Param('id') id: string, @Body() user: User) {
    return this.userService.updateUser(id, user);
  }
  @Delete('user/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
