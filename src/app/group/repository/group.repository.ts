import { BasicRepository } from '../../../common/basic/repository.basic';
import { Group } from '../entity/group.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(Group)
export class GroupRepository extends BasicRepository<Group> {}
