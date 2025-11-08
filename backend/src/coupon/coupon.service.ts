import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    if (!isNaN(parseInt(id)))
      throw new BadRequestException('ID format  not found');
    const couponCheck = await this.prisma.coupon.findUnique({
      where: { id: parseInt(id) },
    });
    if (!couponCheck) throw new NotFoundException('coupon not found');
    const coupon = await this.prisma.coupon.delete({
      where: { id: parseInt(id) },
    });
    return coupon;
  }
}
