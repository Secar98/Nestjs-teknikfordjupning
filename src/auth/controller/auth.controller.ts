import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Request() req): Promise<object> {
    const user = req.user._doc;
    return await this.authService.loginJWT(user);
  }
}
