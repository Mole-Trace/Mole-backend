import { Group } from '../../group/entity/group.entity';
import { GroupService } from '../../group/service/group.service';
import { MemdbService } from '../../memdb/service/memdb.service';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class ListenService {
  constructor(
    private memdbService: MemdbService,
    private groupService: GroupService,
  ) {}

  async verifyToken(token: string): Promise<Group> {
    // const  =

    let group: Group;

    const cache = await this.memdbService.get(`token-${token}`);

    group = cache ? JSON.parse(cache) : null;

    if (group) {
      return group;
    }

    group = await this.groupService.findByToken(token);

    if (!group) {
      throw new ForbiddenException('bad token');
    }

    if (group?.expire) {
      if (group.expire < new Date()) {
        throw new ForbiddenException('token expired');
      }
    }

    await this.memdbService.set(`token-${token}`, JSON.stringify(group), {
      ttl: 60 * 1000,
    });

    return group;
  }
}
