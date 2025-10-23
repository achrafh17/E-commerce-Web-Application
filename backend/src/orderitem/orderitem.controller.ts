import { Controller, Post, Body } from '@nestjs/common';
import { OrderitemService } from './orderitem.service';
import { createOrderItemDto } from './dto/create-orderitem.dto';

@Controller('orderitem')
export class OrderitemController {
  constructor(private orderItemService: OrderitemService) {}
  @Post('create')
  createOrderItem(@Body() data: createOrderItemDto) {
    return this.orderItemService.createOrderItem(data);
  }
}
