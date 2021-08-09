import { BasicController } from '../../../common/basic/controller.basic';
import { Authenticate } from '../../../common/decorators/auth.decorator';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../../user/entity/user.entity';
import { AddNewGroupBodyDto } from '../dto/add-group.dto';
import { GroupService } from '../service/group.service';
import { Body, Post } from '@nestjs/common';

@BasicController('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Authenticate()
  @Post('add')
  async addNewGroup(@GetUser() user: User, @Body() body: AddNewGroupBodyDto) {
    const group = await this.groupService.createNewGroup(user, body);
    return group;
  }
}
