import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LogsModule } from 'src/logs/logs.module';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/role.guard';

@Module({
  imports: [PrismaModule, LogsModule, AuthModule],
  controllers: [ProductController],
  providers: [ProductService, PrismaModule, RolesGuard],
})
export class ProductModule {}
