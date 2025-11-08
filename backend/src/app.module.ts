import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';
import { OrderitemModule } from './orderitem/orderitem.module';
import { AuthModule } from './auth/auth.module';
import { LogsModule } from './logs/logs.module';
import { LogsService } from './logs/logs.service';
import { ReviewsModule } from './reviews/reviews.module';
import { CouponController } from './coupon/coupon.controller';
import { CouponService } from './coupon/coupon.service';
import { CouponModule } from './coupon/coupon.module';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ProductModule,
    OrderModule,
    OrderitemModule,
    AuthModule,
    LogsModule,
    ReviewsModule,
    CouponModule,
    CartModule,
  ],
  controllers: [AppController, ProductController, OrderController, CouponController, CartController],
  providers: [
    AppService,
    UserService,
    ProductService,
    OrderService,
    LogsService,
    CouponService,
    CartService,
  ],
})
export class AppModule {}
