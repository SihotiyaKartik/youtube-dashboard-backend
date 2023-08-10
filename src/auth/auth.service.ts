import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entity/user.entity';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);

    if (user && (await compare(password, user.password))) return user;

    throw new UnauthorizedException('Invalid Credentials');
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      password: user.password,
    };
    return {
      jwt_access_token: this.jwtService.sign(payload),
    };
  }
}
