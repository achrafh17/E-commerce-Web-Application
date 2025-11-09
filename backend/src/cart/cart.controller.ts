import { Controller, Post, Req, UseGuards, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { createCartDto } from './dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: createCartDto, @Req() req) {
    const cart = await this.cartService.create(data, req.user.id);
    return cart;
  }
}
