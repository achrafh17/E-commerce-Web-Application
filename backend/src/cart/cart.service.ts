import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: createCartDto, userId: string) {
    const cart = await this.prisma.cart.create({ data: { ...data, userId } });
    return cart;
  }
  async 
}
