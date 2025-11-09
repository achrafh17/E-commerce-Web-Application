import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CouponController } from './coupon.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CouponService } from './coupon.service';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [CouponService],
  controllers: [CouponController],
})
export class CouponModule {}
