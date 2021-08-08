import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { isArray, isEmpty } from 'lodash';
import { getManager } from 'typeorm';

import { User } from '../../user/entity/user.entity';
import { UserIsOwnerOptionInterface } from '../interface/guard.interface';

const logger = new Logger();

export class UserIsOwner implements CanActivate {
  entity: any;

  options: UserIsOwnerOptionInterface = {};

  constructor(entity: any, options?: UserIsOwnerOptionInterface) {
    this.entity = entity;
    this.options['area'] = options?.area || null;
    this.options['destinationId'] = options?.destinationId || null;
    this.options['sourcePkField'] = options?.sourcePkField || 'id';
    this.options['targetIdentityField'] = options?.targetIdentityField || 'groupId';
    this.options['targetPkField'] = options?.targetPkField || 'id';
    this.options['identify'] = options?.identify || 'group';
    this.options['user'] = options?.user || null;
    this.options['clientIdentityField'] = options?.clientIdentityField || 'id';
  }

  private extractData(request: Request): any[] {
    let data;

    if (this.options.area) {
      data = request[this.options.area];
    } else {
      const requestMethod = request.method;

      if (requestMethod.toLocaleLowerCase() === 'get') {
        data = request?.query;
        data = isEmpty(data) ? request?.params : data;
      } else if (requestMethod.toLocaleLowerCase() === 'delete' || requestMethod.toLocaleLowerCase() === 'put') {
        data = request?.params;
        data = isEmpty(data) ? request?.body : data;
      } else if (requestMethod.toLocaleLowerCase() === 'post') {
        data = request?.body;
      } else {
        throw new InternalServerErrorException('cannot determine method in owner Guard');
      }

      data = isArray(data) ? data : [data];

      return data;
    }
  }

  private extractClientData(request: Request): any {
    const user: User = request.user as any;

    if (this.options.identify === 'group') {
      return user.group;
    } else if (this.options.identify === 'user') {
      return user;
    } else {
      throw new InternalServerErrorException('bad type in user Owner guard');
    }
  }

  private generateQuery(entity: string, clientData, sourceData): string {
    //

    const sourceId = sourceData[this.options.sourcePkField];

    const query = `SELECT COUNT(targetTable.id) as hasPermission from ${entity} targetTable 
		 WHERE targetTable.${this.options.targetPkField}  = ${sourceId} 
		 and targetTable.${this.options.targetIdentityField} = ${clientData[this.options.clientIdentityField]}`;

    return query;
  }

  private async checkIsOwner(entity: any, data: any[], clientData: any) {
    const entityManager = getManager();

    const tableName = entityManager.getRepository(entity).metadata.tableName;

    for (const record of data) {
      const sql = this.generateQuery(tableName, clientData, record);
      const result = await entityManager.query(sql);

      if (+result[0]['hasPermission'] !== 1) {
        throw new BadRequestException(`you are not owner of ${record[this.options.sourcePkField]}`);
      }
    }

    return true;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    if (!req.user) {
      logger.error(`use IsOwner Decorator Upper than UserRolePermission Decorator `, 'Decorator');
      throw new InternalServerErrorException('IsOwner guard exception');
    }

    const data = this.extractData(req);
    const clientData = this.extractClientData(req);

    await this.checkIsOwner(this.entity, data, clientData);

    return true;
  }
}
