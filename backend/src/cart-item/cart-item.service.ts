import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createCartItemDto } from './dto/create-cartItem.dto';

@Injectable()
export class CartItemService {
  constructor(private readonly primsa: PrismaService) {}
  async create(data: createCartItemDto) {
    const cartItem = await this.primsa.cartItem.create(data);
    return cartItem;
  }
}
