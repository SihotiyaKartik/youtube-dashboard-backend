import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: UserDto): Promise<{ message: string }> {
    const { email, password } = createUserDto;
    const isOldUser = await this.userService.findUserByEmail(email);
    if (isOldUser) {
      throw new BadRequestException('Account already exist, Use another email');
    }
    await this.userService.createUser(email, password);
    return { message: 'Account is registered successfully' };
  }

  //   @Post('login')
  //   async login(@Body() loginUserDto: UserDto): Promise<{message: string}> {
  //     const {email, password} = loginUserDto;
  //   }
}
