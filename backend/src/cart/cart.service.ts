import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: createCartDto, userId: number) {
    const cart = await this.prisma.cart.create({ data: { ...data, userId } });
    return cart;
  }

 

  async delete(id: string) {
    if (!isNaN(parseInt(id)))
      throw new BadRequestException('ID format not found');
    const cartCheck = await this.prisma.cart.findUnique({
      where: { id: parseInt(id) },
    });
    if (!cartCheck) throw new NotFoundException('cart not found');
    await this.prisma.cart.delete({ where: { id: parseInt(id) } });
    return cartCheck;
  }

  
}
