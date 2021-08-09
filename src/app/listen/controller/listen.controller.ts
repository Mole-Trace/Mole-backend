import { EventBodyDto } from '../dto/event.dto';
import { ListenService } from '../service/listen.service';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Payload, ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller('listen')
export class ListenController {
  constructor(
    @Inject('REDIS_SERVICE') private client: ClientProxy,
    private listenService: ListenService,
  ) {}

  @Post('event')
  async getEvent(@Body() body: EventBodyDto) {
    const group = await this.listenService.verifyToken(body.token);
    this.client.emit('Events', { data: body, group });
    return { success: true };
  }

  @EventPattern('Events')
  async processEvent(@Payload() data: any) {
    // console.log(`Channel: ${context.getChannel()}`);

    console.log('ali marefati', data);
  }
}
