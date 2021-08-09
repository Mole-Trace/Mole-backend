import { User } from '../../user/entity/user.entity';
import { AddNewGroupBodyDto } from '../dto/add-group.dto';
import { Group } from '../entity/group.entity';
import { GroupRepository } from '../repository/group.repository';
import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GroupService {
  constructor(private groupRepository: GroupRepository) {}

  async createNewGroup(user: User, group: AddNewGroupBodyDto): Promise<Group> {
    const groupExist = await this.groupRepository
      .createQueryBuilder('group')
      .where({ name: group.name })
      .leftJoinAndSelect('group.users', 'user', 'user.id = :id', {
        id: user.id,
      })
      .select(['group.id'])
      .getOne();

    if (groupExist) {
      throw new BadRequestException('group exist already');
    }

    const createdGroup = await this.groupRepository.createAndSave({
      ...group,
      token: uuidv4(),
      users: [user],
    });

    return createdGroup;
  }
}
