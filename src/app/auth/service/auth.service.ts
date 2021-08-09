import { UserService } from '../../user/service/user.service';
import { registerBodyDto } from '../dto/register.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(data: registerBodyDto) {
    const user = await this.userService.register(data);
    const jwt = this.jwtService.sign({ id: user.id, username: user.username });
    return { jwt };
  }
}
