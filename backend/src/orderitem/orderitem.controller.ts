import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { OrderitemService } from './orderitem.service';
import { CreateOrderItemDto } from './dto/create-orderitem.dto';

@Controller('orderitems')
export class OrderitemController {
  constructor(private orderItemService: OrderitemService) {}
  @Post()
  create(@Body() data: CreateOrderItemDto) {
    return this.orderItemService.createOrderItem(data);
  }
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.orderItemService.getOrderItemById(id);
  }
  @Get()
  getAll() {
    return this.orderItemService.getOrderItems();
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.orderItemService.deleteOrderItemById(id);
  }
}
