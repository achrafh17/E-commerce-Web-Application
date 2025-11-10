import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
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
 
}
