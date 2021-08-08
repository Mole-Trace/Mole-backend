import { BasicEntity } from '../../../common/baseic/entity.basic';
import { Column, Entity } from 'typeorm';

@Entity()
export class Group extends BasicEntity {
  @Column()
  name: string;

  @Column()
  events: string;
}
