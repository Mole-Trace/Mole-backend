import { BasicRepository } from '../../../common/basic/repository.basic';
import { Event } from '../entity/event.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(Event)
export class EventRepository extends BasicRepository<Event> {}
