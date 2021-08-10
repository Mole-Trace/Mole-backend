import { registerBodyDto } from '../../auth/dto/register.dto';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async register(data: registerBodyDto): Promise<User> {
    const user = await this.userRepository.count({
      where: { username: data.username },
    });

    if (user) {
      throw new BadRequestException('invalid credential');
    }

    const password = await bcrypt.hash(
      data.password,
      '$2b$10$SSROYgPLQ63a2lfO2rNa6u',
    );

    const createdUser = await this.userRepository.createAndSave({
      ...data,
      displayName: `${data.firstName} ${data.lastName}`,
      password,
    });

    return createdUser;
  }

  async login(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new ForbiddenException('invalid credential');
    }

    const hash = bcrypt.hashSync(password, '$2b$10$SSROYgPLQ63a2lfO2rNa6u');

    const isValidPassword = bcrypt.compare(user.password, hash);

    if (!isValidPassword) {
      throw new ForbiddenException('invalid credential');
    }

    return user;
  }
}
