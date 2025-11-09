import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { createCouponDto } from './dto/create-coupon.dto';

@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: createCouponDto, @Req() req) {
    const coupon = await this.couponService.create(data, req.user.id);
    return coupon;
  }
}
