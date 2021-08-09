import { GroupModule } from '../group/group.module';
import { ListenController } from './controller/listen.controller';
import { ListenService } from './service/listen.service';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    GroupModule,
    ClientsModule.register([
      {
        name: 'REDIS_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6379',
        },
      },
    ]),
  ],
  providers: [ListenService],
  controllers: [ListenController],
})
export class ListenModule {}
