import { BasicEntity } from '../../../common/basic/basic';
import { Group } from '../../group/entity/group.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class User extends BasicEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  displayName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => Group)
  @JoinTable()
  groups: Group[];
}
