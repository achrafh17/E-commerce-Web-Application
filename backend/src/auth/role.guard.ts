import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      Roles,
      context.getHandler(),
    );
    if (!requiredRoles) return true;
    const { user } = context.switchToHttp().getRequest();
    console.log(user);
    return requiredRoles.includes(user.role);
  }
}
