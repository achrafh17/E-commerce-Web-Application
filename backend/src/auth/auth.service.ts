import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly JwtService: JwtService,
  ) {}
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

    const payload = { sub: user.id, email: user.email };
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
}
