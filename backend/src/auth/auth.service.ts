import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Role } from '@prisma/client';
import * as crypto from 'crypto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async createUser(data: CreateUserDto): Promise<Omit<User, 'password'>> {
    try {
      const hashedPassword: string = await bcrypt.hash(data.password, 10);
      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
          role: Role.user,
        },
      });
      const { password, ...result } = user;
      return result;
    } catch (error) {
      return error;
    }
  }
  async login(data: CreateAuthDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: data.email,
        },
      });
      if (!user) throw new NotFoundException('user not found');
      const isMatch: boolean = await bcrypt.compare(
        data.password,
        user.password,
      );
      if (!isMatch)
        return this.Response('Mail or password incorect', 'error', 401);

      const payload = { sub: user.id, email: user.email, role: user.role };
      const token = await this.jwtService.signAsync(payload);
      const { password, ...userWithoutPassord } = user;
      return this.Response(
        'Login successful',
        'success',
        200,
        userWithoutPassord,
        token,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown error';
      throw new InternalServerErrorException(message);
    }
  }
  Response(
    message: string,
    status: 'success' | 'error',
    statusCode: number,
    data?: any,
    token?: any,
  ) {
    return {
      status: status,
      message,
      statusCode,
      data: data ?? null,
      token: token ?? null,
    };
  }

  async sendEmailVerificationCode(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: email },
      });
      if (!user) throw new NotFoundException('user not found');
      const code = await crypto.randomInt(100000, 999999).toString();
      await this.prisma.user.update({
        where: { email: email },
        data: {
          verificationCode: code,
          verificationCodeExpires: new Date(Date.now() + 10 * 60 * 1000),
        },
      });
      await this.mailService.sendMail(
        email,
        'verification code',
        'Your verification code',
        `<h1>${code}</h1>`,
      );
      return { message: 'verification code sent' };
    } catch (error) {
      const message = error instanceof Error ? error : 'unknown error';
      throw new InternalServerErrorException(message);
    }
  }
  async verifyEmail(userId: string, code: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });
      if (!user) throw new NotFoundException('user not found');
      if (!user.verificationCode)
        throw new BadRequestException('no code generated');
      if (user.verificationCode !== code)
        throw new BadRequestException('Invalid verification code');
      if (!user.verificationCodeExpires)
        throw new BadRequestException('code expired');
      if (user.verificationCodeExpires < new Date())
        throw new BadRequestException('verification code expired');
      await this.prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data: {
          emailVerified: true,
          verificationCode: null,
          verificationCodeExpires: null,
        },
      });
      return { message: 'Email verified succefully' };
    } catch (error) {
      const message = error instanceof Error ? error : 'unknown error';
      throw new InternalServerErrorException(message);
    }
  }
  async recoverPassword(email: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) throw new NotFoundException('email not found');
      const code = crypto.randomInt(10000, 999999).toString();
      await this.prisma.user.update({
        where: { email },
        data: {
          resetCode: code,
          resetCodeExpires: new Date(Date.now() + 10 * 60 * 1000),
        },
      });
      await this.mailService.sendMail(
        email,
        'Reset Your Password',
        'Your recovery code',
        `<h1>${code}</h1>`,
      );
      return { message: 'Recovery code sent' };
    } catch (error) {
      const message = error instanceof Error ? error : 'unknown error';
      throw new InternalServerErrorException(message);
    }
  }
  async resetPassword(code: string, newPassword: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { resetCode: code },
      });
      if (!user) throw new NotFoundException('user not found');
      if (!user.resetCode) throw new BadRequestException('no code generated ');
      if (user.resetCode !== code)
        throw new BadRequestException('invalid code ');
      if (!user.resetCodeExpires)
        throw new BadRequestException('verification code expired');
      if (user?.resetCodeExpires < new Date())
        throw new BadRequestException('code expired');
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetCode: null,
          resetCodeExpires: null,
        },
      });
      return { messgae: 'password changed succefully' };
    } catch (error) {
      const message = error instanceof Error ? error : 'unknown error';
      throw new InternalServerErrorException(message);
    }
  }
}
