import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  Create(@Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(dto);
  }
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }
  @Get('orders')
  getAll() {
    return this.orderService.getOrders();
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }
}
