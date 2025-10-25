import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderItemDto } from './dto/create-orderitem.dto';

@Injectable()
export class OrderitemService {
  constructor(private readonly prisma: PrismaService) {}
  //crate orderItemsk
  async createOrderItem(data: CreateOrderItemDto) {
    const orderItem = await this.prisma.orderItem.create({
      data,
    });
    return orderItem;
  }
  async getOrderItemById(id: string) {
    if (isNaN(parseInt(id)))
      throw new BadRequestException('ID format not found');
    const OrderItem = await this.prisma.orderItem.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!OrderItem) throw new NotFoundException('OrderItem not found');
    return OrderItem;
  }
  async getOrderItems() {
    const orderItems = await this.prisma.orderItem.findMany();
    return orderItems;
  }
  async deleteOrderItemById(id: string) {
    if (isNaN(parseInt(id))) throw new BadRequestException('Invalid ID format');
    const orderItemCheck = await this.prisma.orderItem.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!orderItemCheck) throw new NotFoundException('orderItem not found ');
    const orderitem = await this.prisma.orderItem.delete({
      where: {
        id: parseInt(id),
      },
    });
    return orderitem;
  }
}
