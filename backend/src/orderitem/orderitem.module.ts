import { Module } from '@nestjs/common';
import { OrderitemController } from './orderitem.controller';
import { OrderitemService } from './orderitem.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [PrismaModule, AuthModule, LogsModule],
  controllers: [OrderitemController],
  providers: [OrderitemService, PrismaModule],
})
export class OrderitemModule {}
