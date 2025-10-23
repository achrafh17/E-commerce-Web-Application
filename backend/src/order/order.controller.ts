import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { createOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post('create')
  CreateOrder(@Body() dto: createOrderDto) {
    return this.orderService.getCreateOrder(dto);
  }
  @Get('id/:id')
  getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }
  @Get('orders')
  getOrders() {
    return this.orderService.getOrders();
  }
  @Delete('delete/:id')
  DeleteOrder(@Param('id') id: string) {
    return this.orderService.DeleteOrder(id);
  }
}
