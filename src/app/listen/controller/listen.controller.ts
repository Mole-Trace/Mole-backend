import { Controller, Get, Inject, Post } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  RedisContext,
  ClientProxy,
  EventPattern,
} from '@nestjs/microservices';

@Controller('listen')
export class ListenController {
  constructor(@Inject('REDIS_SERVICE') private client: ClientProxy) {}

  @Post()
  async test() {
    this.client.emit('notifications', 'ali');
    return 'ok';
  }

  @EventPattern('notifications')
  getNotifications(@Payload() data: any) {
    // console.log(`Channel: ${context.getChannel()}`);
    console.log('ali marefati', data);
  }
}
