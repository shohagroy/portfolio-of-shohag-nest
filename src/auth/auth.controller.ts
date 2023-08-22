import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/create')
  async create(@Body() createAuthDto: CreateUserDto) {
    const response = await this.authService.create(createAuthDto);
    return {
      message: 'User created successfully',
      data: response,
    };
  }

  @Post('/login')
  async login(@Body() createAuthDto: CreateUserDto) {
    const response = await this.authService.validateUser(createAuthDto);
    return {
      message: 'User Loign successfully',
      data: response,
    };
  }
}
