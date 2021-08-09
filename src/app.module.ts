import { AuthModule } from './app/auth/auth.module';
import { EventModule } from './app/event/event.module';
import { GroupModule } from './app/group/group.module';
import { ListenModule } from './app/listen/listen.module';
import { MemdbModule } from './app/memdb/memdb.module';
import { UserModule } from './app/user/user.module';
import { CommonModule } from './common/common.module';
import typeormConfig from './config/typeorm.config';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot(typeormConfig()),
    CacheModule.register({
      store: redisStore,
      url: 'redis://localhost:6379',
    }),
    GroupModule,
    CommonModule,
    EventModule,
    ListenModule,
    UserModule,
    AuthModule,
    MemdbModule,
  ],
})
export class AppModule {}
