import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { LogsService } from 'src/logs/logs.service';
import { createCartDto } from 'src/cart/dto/create-cart.dto';
import { OrderStatus } from '@prisma/client';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly logsService: LogsService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async Create(@Body() dto: CreateOrderDto, @Req() req) {
    const createdOrder = await this.orderService.createOrder(dto, req.user.id);
    await this.logsService.createLog({
      userId: req.user.id,
      action: 'Create Order',
      description: `User ${req.user.id} created Order N-${createdOrder.id}`,
      ipAddress: 'this is an ip address',
    });
    return createdOrder;
  }
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getAll() {
    return this.orderService.getOrders();
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req) {
    await this.logsService.createLog({
      userId: req.user.id,
      action: 'Create Order',
      description: `User ${req.user.id} Deleted  Order N-${id}`,
      ipAddress: 'this is an ip address',
    });
    return this.orderService.deleteOrder(id);
  }
  @Get('users/:id')
  async getUserOrders(@Param('id') id: string) {
    return await this.orderService.getUserOrders(id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async status(@Body() data: any, @Param('id') id: string, @Req() req) {
    const order = await this.orderService.status(
      id,
      data?.status ?? OrderStatus.PENDING,
    );
    await this.logsService.createLog({
      userId: req.user.id,
      action: 'update order',
      description: `User ${req.user.id} change order status to ${data.status} `,
      ipAddress: 'this is an ip address',
    });
    return order;
  }
}
