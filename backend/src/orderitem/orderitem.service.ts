import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createOrderItemDto } from './dto/create-orderitem.dto';

@Injectable()
export class OrderitemService {
  constructor(private readonly prisma: PrismaService) {}
  async createOrderItem(data: createOrderItemDto) {
    const orderItem = await this.prisma.orderItem.create({ data });
    return orderItem;
  }
  async getOrderItemById(id: string) {
    const OrderItem = await this.prisma.orderItem.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    return OrderItem;
  }
  async getOrderItems() {
    const orderItems = await this.prisma.orderItem.findMany();
    return orderItems;
  }
  async deleteOrderItemById(id: string) {
    const orderitem = await this.prisma.orderItem.delete({
      where: {
        id: parseInt(id),
      },
    });
    return orderitem;
  }
}
