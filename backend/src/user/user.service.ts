import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';
import { text } from 'stream/consumers';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<Omit<User, 'password'>> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        role: Role.user,
      },
    });
    const { password, ...result } = user;
    return result;
  }
  async getUsers(): Promise<User[] | null> {
    const users = await this.prisma.user.findMany();
    return users;
  }
  async getUserById(id: string): Promise<User | null> {
    if (isNaN(parseInt(id)))
      throw new BadRequestException('ID format not found');
    const user = await this.prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }
  async update(updateData: any, id: string) {
    if (isNaN(parseInt(id)))
      throw new BadGatewayException('ID format not found');
    const userCheck = await this.prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!userCheck) throw new NotFoundException('user not found');
    const user = await this.prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    return user;
  }
  async updatePassword(password: string, id: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.update({
      where: { id: parseInt(id) },
      data: { password: hashedPassword },
    });
    return user;
  }
  async deleteUser(id: string): Promise<void> {
    if (isNaN(parseInt(id)))
      throw new BadRequestException('ID format not found');
    const user = await this.prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) throw new NotFoundException('User not found');

    await this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: parseInt(id) },
        data: {
          status: 'deleted',
          deletedAt: new Date(),
        },
      });
      await tx.product.updateMany({
        where: { ownerId: parseInt(id) },
        data: { deletedAt: new Date(), status: 'deleted' },
      });
      await tx.review.updateMany({
        where: { userId: parseInt(id) },
        data: { deletedAt: new Date() },
      });
      await tx.cart.delete({
        where: { userId: parseInt(id) },
      });
    });
  }
  async assignRole(role: Role, id: string) {
    if (role === 'admin') {
      const user = await this.prisma.user.update({
        where: { id: parseInt(id) },
        data: { role: 'admin' },
      });
      return user;
    } else if (role === 'user') {
      const user = await this.prisma.user.update({
        where: { id: parseInt(id) },
        data: { role: 'user' },
      });
      return user;
    } else if (role === 'guest') {
      const user = await this.prisma.user.update({
        where: { id: parseInt(id) },
        data: { role: 'guest' },
      });
      return user;
    } else throw new BadRequestException('role format not found');
  }
}
