import { AuthModule } from './app/auth/auth.module';
import { CacheModule } from './app/cache/cache.module';
import { EventModule } from './app/event/event.module';
import { GroupModule } from './app/group/group.module';
import { ListenModule } from './app/listen/listen.module';
import { UserModule } from './app/user/user.module';
import { CommonModule } from './common/common.module';
import typeormConfig from './config/typeorm.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot(typeormConfig()),
    GroupModule,
    CommonModule,
    EventModule,
    ListenModule,
    UserModule,
    AuthModule,
    CacheModule,
  ],
})
export class AppModule {}
