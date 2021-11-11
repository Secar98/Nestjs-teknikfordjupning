import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signupUser(@Request() req: object): Promise<object> {
    const { password, ...rest } = await this.usersService.signUpUser(req);
    return rest;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
