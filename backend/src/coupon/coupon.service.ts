import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createCouponDto } from './dto/create-coupon.dto';

@Injectable()
export class CouponService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: createCouponDto, userId: string) {
    const coupon = await this.prisma.coupon.create({
      data: { ...data, userId },
    });
    return coupon;
  }

  async delete(id: string) {
    const coupon = await this.prisma.coupon.delete({
      where: { id: parseInt(id) },
    });
    return coupon;
  }
}
