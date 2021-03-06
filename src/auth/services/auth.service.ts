import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.loginUser(email, password);
    if (user) {
      return user;
    }
  }

  async loginJWT(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
