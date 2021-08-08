import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserRole } from '../../user/enum/role.enum';
import { RolePermissionMetDataKey } from '../config/role-permission.config';

@Injectable()
export class RolePermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const roleRequired: UserRole[] = this.reflector.get<UserRole[]>(RolePermissionMetDataKey, context.getHandler());

    if (roleRequired.length === 0 || roleRequired.includes(UserRole.Public)) {
      return true;
    }

    if (!roleRequired.includes(request.user.role.name)) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
