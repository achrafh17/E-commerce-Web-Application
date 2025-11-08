import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LogsService } from 'src/logs/logs.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logsService: LogsService,
  ) {}

  @Post()
  async login(@Body() data: CreateAuthDto) {
    const user = await this.authService.login(data);
    console.log(user);
    await this.logsService.createLog({
      userId: user.data.id,
      action: 'login',
      description: `User ${user.data.id} login`,
      ipAddress: 'this is an ip address',
    });
    return user;
  }
}
