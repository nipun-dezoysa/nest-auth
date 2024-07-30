import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const payload = { username: user.email, sub: { name: user.name } };
    return {
      user,
      backendToken: await this.jwt.signAsync(payload, {
        expiresIn: '1h',
        secret: process.env.jwtSecretKey,
      }),
      RefreshToken: await this.jwt.signAsync(payload, {
        expiresIn: '1d',
        secret: process.env.jwtSecretKey,
      }),
    };
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
