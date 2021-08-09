import { UserModule } from '../user/user.module';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './service/auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.register({
      privateKey: 'ali',
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
  exports: [JwtStrategy],
})
export class AuthModule {}
