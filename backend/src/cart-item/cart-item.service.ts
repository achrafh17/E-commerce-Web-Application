import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createCartItemDto } from './dto/create-cartItem.dto';

@Injectable()
export class CartItemService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: createCartItemDto) {
    if (isNaN(data.productId) || isNaN(data.cartId))
      throw new BadRequestException('ID format not found');
    const cartCheck = await this.prisma.cart.findUnique({
      where: { id: data.cartId },
    });
    if (!cartCheck) throw new NotFoundException('cart not found');
    const cartItem = await this.prisma.cartItem.create({ data });
    return cartItem;
  }
  async delete(id: string) {
    if (isNaN(parseInt(id)))
      throw new BadRequestException('ID format not found');
    const cartItem = await this.prisma.cartItem.delete({
      where: { id: parseInt(id) },
    });
    return cartItem;
  }
  async itemQuantity(quantity: number, id: string) {
    if (isNaN(parseInt(id)))
      throw new BadRequestException('ID format not found');
    const cartItemCheck = await this.prisma.cartItem.findUnique({
      where: { id: parseInt(id) },
    });
    if (!cartItemCheck) throw new NotFoundException('cart item not found');
    const cartItem = await this.prisma.cartItem.update({
      where: { id: parseInt(id) },
      data: { quantity: quantity },
    });
    return cartItem;
  }
}
