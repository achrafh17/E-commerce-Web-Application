import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  async getCreateOrder(data: createOrderDto) {
    const Order = await this.prisma.order.create({ data });
    return Order;
  }
  async getOrderById(id: string) {
    const order = await this.prisma.order.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    return order;
  }
  async getOrders() {
    const orders = await this.prisma.order.findMany();
    return orders;
  }
  async DeleteOrder(id: string) {
    const order = await this.prisma.order.delete({
      where: {
        id: parseInt(id),
      },
    });
    return order;
  }
}
