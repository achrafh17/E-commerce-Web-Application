import {
  Controller,
  Post,
  Req,
  UseGuards,
  Body,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { createCartDto } from './dto/create-cart.dto';
import { LogsService } from 'src/logs/logs.service';
import { CartItemService } from 'src/cart-item/cart-item.service';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly logsSerive: LogsService,
    private readonly cartItemService: CartItemService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: createCartDto, @Req() req) {
    const cart = await this.cartService.create(data, req.user.id);
    const log = await this.logsSerive.createLog({
      userId: req.user.id,
      action: 'create cart',
      description: `User ${req.user.id} create cart ${cart.id} `,
      ipAddress: 'this is an ip address',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req) {
    const cart = await this.cartService.delete(id);
    await this.logsSerive.createLog({
      userId: req.user.id,
      action: 'Cart deleted',
      description: `User ${req.user.id} deleted cart ${cart.id} `,
      ipAddress: 'this is an ip address',
    });
  }
  @UseGuards(JwtAuthGuard)
  @Delete('cartItem/:id')
  async deleteCartItem(@Param('id') id: string, @Req() req) {
    const cartItem = await this.cartItemService.delete(id);
    await this.logsSerive.createLog({
      userId: req.user.id,
      action: 'CartItem deleted',
      description: `User ${req.user.id} deleted cartItem ${id} `,
      ipAddress: 'this is an ip address',
    });
    return cartItem;
  }
}
