import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LogsService } from 'src/logs/logs.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { MailService } from 'src/mail/mail.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logsService: LogsService,
    private readonly mailService: MailService,
  ) {}
  @Post('register')
  async create(@Body() data: CreateUserDto) {
    const user = await this.authService.createUser(data);
    await this.logsService.createLog({
      userId: user.id,
      action: `user created `,
      description: `User ${user.id} has been registred`,
      ipAddress: 'this is an ip address',
    });
    return user;
  }
  @Post('login')
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
  @Post('sendCode')
  async sendCode() {
    const code = await this.authService.sendCode();
    return code;
  }
  @Post(':id/emailVerified')
  async emailVerified(@Body() data: any, @Param('id') id: string) {
    const user = await this.authService.verifiedEmail(data.emailVerified, id);
    return user;
  }
}
