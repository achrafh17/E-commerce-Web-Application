import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { createCouponDto } from './dto/create-coupon.dto';
import { Roles } from 'src/auth/roles.decorator';
import { LogsService } from 'src/logs/logs.service';

@Controller('coupons')
export class CouponController {
  constructor(
    private readonly couponService: CouponService,
    private readonly logsService: LogsService,
  ) {}
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: createCouponDto, @Req() req) {
    const coupon = await this.couponService.create(data, req.user.id);
    await this.logsService.createLog({
      userId: req.user.id,
      action: 'create coupon',
      description: `Admin ${req.user.id} create coupon ${coupon.id} for the code ${coupon.code} `,
      ipAddress: 'this is an ip address',
    });
    return coupon;
  }
}
