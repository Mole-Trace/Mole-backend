import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Payload, ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller('listen')
export class ListenController {
  constructor(@Inject('REDIS_SERVICE') private client: ClientProxy) {}

  @Post('event')
  async getEvent(@Body() body: any) {
    this.client.emit('Events', body);
    return { success: true };
  }

  @EventPattern('Events')
  async processEvent(@Payload() data: any) {
    // console.log(`Channel: ${context.getChannel()}`);

    console.log('ali marefati', data);
  }
}
