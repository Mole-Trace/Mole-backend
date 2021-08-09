import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';

@Injectable()
export class MemdbService {
  constructor(@Inject(CACHE_MANAGER) private memdb: Cache) {}

  async get(key: string): Promise<any> {
    const value = await this.memdb.get(key);
    return value;
  }

  async set(key: string, value: any, options?: CachingConfig): Promise<any> {
    const result = await this.memdb.set(key, value, options);
    return result;
  }

  async del(key: string): Promise<any> {
    const value = await this.memdb.del(key);
    return value;
  }

  async reset(): Promise<void> {
    const value = await this.memdb.reset();
    return value;
  }
}
