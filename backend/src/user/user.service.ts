import {
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

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<Omit<User, 'password'>> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
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
    });
  }
}
