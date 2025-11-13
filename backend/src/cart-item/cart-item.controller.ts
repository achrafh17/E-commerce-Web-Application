import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { createCartItemDto } from './dto/create-cartItem.dto';
import { LogsService } from 'src/logs/logs.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('cart-item')
export class CartItemController {
  constructor(
    private readonly cartItemService: CartItemService,
    private readonly logsService: LogsService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: createCartItemDto, @Req() req) {
    const cartItem = await this.cartItemService.create(data);
    await this.logsService.createLog({
      userId: req.user.id,
      action: 'create cartItem',
      description: `User ${req.user.id} create the  cartItem  ${cartItem.id} `,
      ipAddress: 'this is an ip address',
    });
    return cartItem;
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateQuantity(
    @Body() data: createCartItemDto,
    @Param('id') id: string,
    @Req() req,
  ) {
    const cartItem = await this.cartItemService.updateQuantity(
      data.quantity,
      id,
    );
    await this.logsService.createLog({
      userId: req.user.id,
      action: 'update cartItem',
      description: `User ${req.user.id} update the  cartItem quantity to ${data.quantity} `,
      ipAddress: 'this is an ip address',
    });
    return cartItem;
  }
}
