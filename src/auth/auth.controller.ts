import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() loginDto: UserDto,
  ): Promise<{ jwt_access_token: string }> {
    const { email, password } = loginDto;
    const user = await this.authService.validUser(email, password);

    return this.authService.login(user);
  }
}
