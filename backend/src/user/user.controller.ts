import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }
  @Get()
  getAll() {
    return this.userService.getUsers();
  }
  @Get(':id')
  async getById(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  @Delete(':id')
  Delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
