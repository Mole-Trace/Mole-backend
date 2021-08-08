import { EventRepository } from './repository/event.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EventRepository])],
})
export class EventModule {}
