import { registerBodyDto } from '../dto/register.dto';
import { AuthService } from '../service/auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: registerBodyDto) {
    const result = await this.authService.register(body);
    return result;
  }
}
