import { GroupController } from './controller/group.controller';
import { GroupRepository } from './repository/group.repository';
import { GroupService } from './service/group.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GroupRepository])],
  providers: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
