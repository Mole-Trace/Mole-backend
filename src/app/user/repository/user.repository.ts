import { BasicRepository } from '../../../common/basic/repository.basic';
import { User } from '../entity/user.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends BasicRepository<User> {}
