import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { stat } from 'fs';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  async createOrder(data: CreateOrderDto, userId: number) {
    const Order = await this.prisma.order.create({ data: { ...data, userId } });
    return Order;
  }
  async getOrderById(id: string) {
    if (isNaN(parseInt(id)))
      throw new BadRequestException('ID format not found');
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

  //get the orders that user order
  //id: user id
  async getUserOrders(id: string) {
    if (isNaN(parseInt(id)))
      throw new BadRequestException('ID format not found');
    const user = await this.prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) throw new NotFoundException('User not found');
    const orders = await this.prisma.order.findMany({
      where: {
        userId: parseInt(id),
      },
    });
    return orders;
  }
  async status(id: string, status: OrderStatus) {
    const checkOrder = await this.prisma.order.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!checkOrder) throw new NotFoundException('order not found');
    const order = await this.prisma.order.update({
      where: { id: parseInt(id) },
      data: { status: status },
    });
    return order;
  }
}
