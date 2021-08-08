import { ListenController } from './controller/listen.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ListenController],
})
export class ListenModule {}
