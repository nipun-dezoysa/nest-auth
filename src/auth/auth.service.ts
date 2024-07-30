import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    return user;
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.username);
    if (user && (await compare(dto.password, user.password))) {
      delete user.password;
      return user;
    }
    throw new UnauthorizedException();
  }
}
