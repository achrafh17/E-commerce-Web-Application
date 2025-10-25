import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  async createOrder(data: CreateOrderDto) {
    const Order = await this.prisma.order.create({ data });
    return Order;
  }
  async getOrderById(id: string) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!order) throw new NotFoundException('order not found');
    return order;
  }
  async getOrders() {
    const orders = await this.prisma.order.findMany();
    return orders;
  }
  async deleteOrder(id: string) {
    const checkOrder = await this.prisma.order.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!checkOrder) throw new NotFoundException('order not found');
    const order = await this.prisma.order.delete({
      where: {
        id: parseInt(id),
      },
    });
    return order;
  }
}
