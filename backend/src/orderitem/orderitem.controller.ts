import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { OrderitemService } from './orderitem.service';
import { createOrderItemDto } from './dto/create-orderitem.dto';

@Controller('orderitem')
export class OrderitemController {
  constructor(private orderItemService: OrderitemService) {}
  @Post('create')
  createOrderItem(@Body() data: createOrderItemDto) {
    return this.orderItemService.createOrderItem(data);
  }
  @Get('id/:id')
  getOrderItemById(@Param('id') id: string) {
    return this.orderItemService.getOrderItemById(id);
  }
  @Get('orderitems')
  getorderItems() {
    return this.orderItemService.getOrderItems();
  }
  @Delete(':id')
  deleteOrderItemById(@Param('id') id: string) {
    return this.orderItemService.deleteOrderItemById(id);
  }
}
