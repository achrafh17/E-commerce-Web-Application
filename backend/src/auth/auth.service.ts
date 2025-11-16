import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';
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
    private readonly JwtService: JwtService,
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
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!user) throw new NotFoundException('user not found');
    const isMatch: boolean = await bcrypt.compare(data.password, user.password);
    if (!isMatch)
      return this.Response('Mail or password incorect', 'error', 401);

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = await this.JwtService.signAsync(payload);
    const { password, ...userWithoutPassord } = user;
    return this.Response(
      'login succedl',
      'success',
      200,
      userWithoutPassord,
      token,
    );
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

  async sendCode() {
    try {
      const code: string = crypto.randomBytes(2).toString('hex').toUpperCase();
      const mail = await this.mailService.sendMail(
        'achrafhafid565@gmail.com',
        'test',
        'test',
        `<h1>${code}</h1>`,
      );
      return code;
    } catch (error) {
      return this.Response('error verfifying email', 'error', 500, error);
    }
  }
  async verifiedEmail(verifiedEmail: boolean, id: string) {
    try {
      const userCheck = await this.prisma.user.findUnique({
        where: { id: parseInt(id) },
      });
      if (!userCheck) throw new NotFoundException('user not found');
      if (verifiedEmail === true) {
        const user = await this.prisma.user.update({
          where: { id: parseInt(id) },
          data: { emailVerified: true },
        });
        return user;
      }
    } catch (error) {
      return this.Response('error verifying the email', 'error', 500, error);
    }
  }
}
