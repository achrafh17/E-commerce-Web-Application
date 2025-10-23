import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createOrderItemDto } from './dto/create-orderitem.dto';

@Injectable()
export class OrderitemService {
  constructor(private prisma: PrismaService) {}
  async createOrderItem(data: createOrderItemDto) {
    const orderItem = await this.prisma.orderItem.create({ data });
    return orderItem;
  }
}
