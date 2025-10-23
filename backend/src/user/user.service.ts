import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(data: createUserDto) {
    const user = await this.prisma.user.create({ data });
    console.log(user);
    return 'hey';
  }
  async getusers() {
    const users = await this.prisma.user.findMany();
    return users;
  }
  async getUserById(id: string) {
    const users = await this.prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
    });
    console.log(users);
  }
  async DeleteUser(id: string) {
    await this.prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
  }
}
