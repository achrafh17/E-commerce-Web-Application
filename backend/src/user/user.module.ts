import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [PrismaModule, LogsModule],
  controllers: [UserController],
  providers: [UserService, PrismaModule],
})
export class UserModule {}
