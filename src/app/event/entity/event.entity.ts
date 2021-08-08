import { BasicEntity } from '../../../common/basic/basic';
import { Group } from '../../group/entity/group.entity';
import { Column, ManyToOne } from 'typeorm';

export class Event extends BasicEntity {
  @Column()
  identifier: string;

  @Column()
  extra: string;

  @Column()
  state: string;

  @Column()
  status: 'success' | 'failed' | 'pending' | 'unknown';

  @Column({ type: Date })
  startedAt: Date;

  @Column({ type: Date })
  finishedAt: Date;

  @ManyToOne(() => Group, (group) => group.events)
  group: Group;
}
