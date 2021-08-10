import { BasicController } from '../../../common/basic/controller.basic';
import { registerBodyDto } from '../dto/register.dto';
import { AuthService } from '../service/auth.service';
import { Body, Post } from '@nestjs/common';

@BasicController('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: registerBodyDto) {
    const result = await this.authService.register(body);
    return result;
  }

  @Post('login')
  async login(@Body() body: registerBodyDto) {
    const result = await this.authService.login(body);
    return result;
  }
}
