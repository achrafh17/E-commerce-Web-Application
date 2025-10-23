import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('create')
  create(@Body() dto: createUserDto) {
    console.log(dto);
    return this.userService.createUser(dto);
  }
  @Get('users')
  getusers() {
    return this.userService.getusers();
  }
  @Post('user/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
  @Delete('delete/:id')
  DeleteUser(@Param('id') id: string) {
    return this.userService.DeleteUser(id);
  }
}
