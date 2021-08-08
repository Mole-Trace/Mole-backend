import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { isEmpty } from 'lodash';
import { Group } from 'src/app/user/entity/group.entity';
import { User } from 'src/app/user/entity/user.entity';
import { GroupPolicyInterFace } from 'src/app/user/interface/group-policy.interface';
import { getManager } from 'typeorm';

import { FeatureLimitationInterface } from '../../../common/interface/feature-limit.interface';

@Injectable()
export class FeatureLimitGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const limits: FeatureLimitationInterface = this.reflector.get('APP_FEATURE_LIMIT', context.getHandler());

    if (isEmpty(limits)) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    const user = request.user as User;

    if (isEmpty(user)) {
      throw new ForbiddenException('login required');
    }

    const entityManager = getManager();
    const group = await entityManager.findOne(Group, { where: { id: user.member.id } });

    if (isEmpty(group?.policy)) {
      throw new ForbiddenException('secretary access denied');
    }

    const policy: GroupPolicyInterFace = JSON.parse(group.policy);

    const userPolicy = policy.membersPolicy.find((item) => (item.userId = user.id));

    if (!userPolicy) {
      throw new ForbiddenException('user policy not found');
    }

    const constraint = userPolicy.constraints.find(
      (item) => item.target === limits.target && item.action === limits.action,
    );

    if (!constraint) {
      throw new ForbiddenException('constraint not exist');
    }

    if (constraint.hasPermission !== true) {
      throw new ForbiddenException('secretary has noPermission');
    }

    return true;
  }
}
