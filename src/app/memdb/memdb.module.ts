import { MemdbService } from './service/memdb.service';
import { CacheModule, Global, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

@Global()
@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      url: 'redis://localhost:6379',
    }),
  ],
  providers: [MemdbService],
  exports: [MemdbService],
})
export class MemdbModule {}
