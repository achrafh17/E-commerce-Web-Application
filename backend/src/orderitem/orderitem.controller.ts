import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderitemService } from './orderitem.service';
import { CreateOrderItemDto } from './dto/create-orderitem.dto';
import { LogsService } from 'src/logs/logs.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('orderitems')
export class OrderitemController {
  constructor(
    private orderItemService: OrderitemService,
    private readonly logsService: LogsService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateOrderItemDto, @Req() req) {
    const OrderItem = await this.orderItemService.createOrderItem(data);
    await this.logsService.createLog({
      userId: req.user.id,
      action: 'Create Order',
      description: `User ${req.user.id} created OrderItem N-${OrderItem.id}`,
      ipAddress: 'this is an ip address',
    });
    return OrderItem;
  }
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.orderItemService.getOrderItemById(id);
  }
  @Get()
  getAll() {
    return this.orderItemService.getOrderItems();
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req) {
    await this.logsService.createLog({
      userId: req.user.id,
      action: 'Create Order',
      description: `User ${req.user.id} deleted OrderItem N-${id}`,
      ipAddress: 'this is an ip address',
    });
    return this.orderItemService.deleteOrderItemById(id);
  }
}
