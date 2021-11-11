import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signupUser(@Request() req: object): Promise<object> {
    return await this.usersService.signUser(req);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Request() req): Promise<object> {
    const { _doc: user } = req.user;
    delete user['password'];
    return await this.authService.login(user);
  }
}
