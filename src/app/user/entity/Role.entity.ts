import { BasicEntity } from '../../../common/basic/basic';
import { Entity } from 'typeorm';

@Entity()
export class Role extends BasicEntity {
  name: 'owner' | 'admin' | 'member' | 'guest';
}
