import { EventModule } from './app/event/event.module';
import { GroupModule } from './app/group/group.module';
import { ListenModule } from './app/listen/listen.module';
import { CommonModule } from './common/common.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      username: 'postgres',
      password: 'root',
      port: 5432,
      database: 'mole',
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      logging: true,
    }),
    GroupModule,
    CommonModule,
    EventModule,
    ListenModule,
  ],
})
export class AppModule {}
