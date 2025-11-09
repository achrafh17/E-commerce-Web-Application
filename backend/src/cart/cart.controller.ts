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

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly logsSerive: LogsService,
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
    const log = await this.logsSerive.createLog({
      userId: req.user.id,
      action: 'Cart deleted',
      description: `User ${req.user.id} deleted cart ${cart.id} `,
      ipAddress: 'this is an ip address',
    });
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: createCartDto,
    @Req() req,
  ) {
    const cart = await this.cartService.update(data, req.user.id, id);
    return cart;
  }
}
