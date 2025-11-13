import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CouponController } from './coupon.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CouponService } from './coupon.service';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [PrismaModule, AuthModule, LogsModule],
  providers: [CouponService],
  controllers: [CouponController],
})
export class CouponModule {}
