import { BasicEntity } from '../../../common/basic/basic';
import { Event } from './event.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Log extends BasicEntity {
  @Column()
  extra: string;

  @Column()
  state: string;

  @Column()
  status: 'success' | 'failed' | 'pending' | 'unknown';

  @Column({ type: Date })
  startedAt: Date;

  @ManyToOne(() => Event, (event) => event.id)
  event: Event;
}
