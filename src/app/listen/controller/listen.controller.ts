import { Controller, Get } from '@nestjs/common';

@Controller('listen')
export class ListenController {
  @Get()
  async test() {
    return 'ok';
  }
}
