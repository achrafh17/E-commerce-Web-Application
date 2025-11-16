import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LogsService } from 'src/logs/logs.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { MailService } from 'src/mail/mail.service';
import { sendCodeDto } from './dto/create-auth-sendCode.dto';
import { verifyEmailDto } from './dto/verifyEmail.dto';
import { recoverPasswordDto } from './dto/recoverCode.dto';
import { resetPasswordDto } from './dto/resetPassword.dto';

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
  @Post('send-code')
  async sendCode(@Body() data: sendCodeDto) {
    const code = await this.authService.sendEmailVerificationCode(data.email);
    return code;
  }
  @Post(':id/verify-email')
  async emailVerified(@Body() data: verifyEmailDto, @Param('id') id: string) {
    const user = await this.authService.verifyEmail(id, data.code);
    return user;
  }
  @Post('/recover-password')
  async recoverPassword(@Body() data: recoverPasswordDto) {
    const mail = await this.authService.recoverPassword(data.email);
    return mail;
  }
  @Post('/reset-password')
  async resetPassword(@Body() data: resetPasswordDto) {
    const mail = await this.authService.resetPassword(
      data.code,
      data.newPassword,
    );
    return mail;
  }
}
