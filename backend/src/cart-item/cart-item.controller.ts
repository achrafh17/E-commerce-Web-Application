import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { createCartItemDto } from './dto/create-cartItem.dto';

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}
  @Post()
  async create(@Body() data: createCartItemDto) {
    const cartItem = await this.cartItemService.create(data);
    return cartItem;
  }
  @Patch(':id')
  async updateQuantity(
    @Body() data: createCartItemDto,
    @Param('id') id: string,
  ) {
    const cartItem = await this.cartItemService.updateQuantity(
      data.quantity,
      id,
    );
    return cartItem;
  }
}
