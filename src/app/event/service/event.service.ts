import { Event } from '../entity/event.entity';
import { EventRepository } from '../repository/event.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventService {
  constructor(private eventRepository: EventRepository) {}

  async submitEvent(event: Event): Promise<Event> {
    const createdEvent = await this.eventRepository.createAndSave(event);
    return createdEvent;
  }
}
