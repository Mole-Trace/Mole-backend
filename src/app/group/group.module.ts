import { GroupRepository } from './repository/group.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GroupRepository])],
})
export class GroupModule {}
