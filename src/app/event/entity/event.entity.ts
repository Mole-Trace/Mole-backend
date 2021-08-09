import { BasicEntity } from '../../../common/basic/basic';
import { Group } from '../../group/entity/group.entity';
import { Log } from './log.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Event extends BasicEntity {
  @Column()
  identifier: string;

  @ManyToOne(() => Group, (group) => group.events)
  group: Group;

  @OneToMany(() => Log, (log) => log.event)
  logs: Log[];
}
