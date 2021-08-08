import { BasicEntity } from '../../../common/basic/basic';
import { Event } from '../../event/entity/event.entity';
import { User } from '../../user/entity/user.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Group extends BasicEntity {
  @Column()
  name: string;

  @ManyToMany(() => User)
  user: User[];

  @OneToMany(() => Event, (event) => event.group, { onDelete: 'CASCADE' })
  events: Event[];
}
