import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  Create(@Body() dto: CreateOrderDto, @Req() req) {
    console.log('test', req.user);
    return this.orderService.createOrder(dto, req.user.id);
  }
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }
  @Get()
  getAll() {
    return this.orderService.getOrders();
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }
}
