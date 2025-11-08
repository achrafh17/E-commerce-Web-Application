import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LogsModule } from 'src/logs/logs.module';
import { ReviewsModule } from 'src/reviews/reviews.module';

@Module({
  imports: [PrismaModule, LogsModule, ReviewsModule],
  controllers: [UserController],
  providers: [UserService, PrismaModule],
})
export class UserModule {}
