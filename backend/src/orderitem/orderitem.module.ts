import { Module } from '@nestjs/common';
import { OrderitemController } from './orderitem.controller';
import { OrderitemService } from './orderitem.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OrderitemController],
  providers: [OrderitemService, PrismaModule],
})
export class OrderitemModule {}
