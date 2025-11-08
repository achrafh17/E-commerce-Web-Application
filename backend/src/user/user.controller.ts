import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LogsService } from 'src/logs/logs.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly LogsService: LogsService,
  ) {}
  @Post()
  async create(@Body() data: CreateUserDto) {
    const user = await this.userService.createUser(data);
    await this.LogsService.createLog({
      userId: user.id,
      action: `user created `,
      description: `User ${user.id} has been registred`,
      ipAddress: 'this is an ip address',
    });
    return user;
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
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Delete(':id')
  async Delete(@Param('id') id: string, @Req() req) {
    await this.LogsService.createLog({
      userId: req.user.id,
      action: 'User deleted',
      description: `User ${req.user.id} deleted user ${id} `,
      ipAddress: 'this is an ip address',
    });
    
    console.log(req.user);
    return this.userService.deleteUser(id);
  }
}
