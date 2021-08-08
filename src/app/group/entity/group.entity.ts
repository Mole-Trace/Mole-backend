import { BasicEntity } from '../../../common/basic/basic';
import { Event } from '../../event/entity/event.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Group extends BasicEntity {
  @Column()
  name: string;

  @OneToMany(() => Event, (event) => event.group, { onDelete: 'CASCADE' })
  events: Event[];
}
