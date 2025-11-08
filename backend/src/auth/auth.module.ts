import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { LogsModule } from 'src/logs/logs.module';
import { JwtAuthGuard } from './jwt.guard';
import { RolesGuard } from './role.guard';

@Module({
  imports: [
    PassportModule,
    LogsModule,
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_Secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, PrismaModule, JwtStrategy, JwtAuthGuard, RolesGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
