import { MemdbService } from './service/memdb.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [MemdbService],
  exports: [MemdbService],
})
export class MemdbModule {}
